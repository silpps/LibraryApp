# Example 1 Handling errors as soon as possible to reduce load:

In some places in our code we unnecessarily delay error handling by running unrelated code in between the cause of errors, creating unnecessary load on the system.

```
const login = async (req, res) => {
  try{
    //Takes email, password from request
  const {email, password}= req.body
  //Find the user with the matching email
  const registeredUser = await User.findOne({email})
  //Checks if the passwords match
  const passwordMatch = await bcrypt.compare(password, registeredUser.password)
  if(!registeredUser){
    throw Error("No user with linked email found")
  }
  if(!passwordMatch){
    throw Error("Incorrect password")
   } }}
````

So for example here instead of running passwordMatch before the registeredUser check, we should run this after the user check to avoid unrelated execution of code, like so:
```
if (!registeredUser) {
  throw Error("No user with linked email found");
}
const passwordMatch = await bcrypt.compare(password, registeredUser.password);
if (!passwordMatch) {
  throw Error("Incorrect password");
}
```

# Example 2: Simplifying error handling with middleware.

In our code we're using many repeated try-catch blocks for error handling like this:
```
const getAllUsers = async (req, res) => {

  try{
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
  } catch (error){
    res.status(500).json({message:"Failed to retrieve users", error:error.message})
  }
};
```
When instead we could use a middleware, such as express-async-handler to simplify these for better readability and consistency, like so:
```
const asyncHandler = require('express-async-handler');

// Example of refactored route
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
});

// Middleware usage
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
```

# Example 3: Centralizing user input validation

Instead of repeating the same checks for user input validation in different parts of the code, like the username and email here:
```
const createUser = async (req, res) => {
  try{
    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const emailInUse = await User.findOne({email})
    if(emailInUse){
      throw Error("This email is already in use")
    }
    const usernameInUse = await User.findOne({username})
    if (usernameInUse){
      throw Error("This username is already in use")
    }
    const newUser = new User({username, email, password:hashedPassword, library:[], wishlist:[], description:""})
    await newUser.save()
    const token = createToken(newUser._id);
    res.status(201).json({id:newUser._id, token})
  } catch (error){
    res.status(400).json({message:"Failed to create user", error:error.message})
  }
};
```
We could centralize the validation through a library like Joi to avoid repetition and improve consistency via validation like this:
```
const Joi = require('joi');

// Define schema for user creation
const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// Middleware for validation
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Example route with validation
router.post('/signup', validateRequest(userSchema), createUser);
```

# Example 4: Utilising Mongoose aggregation for filtering and pagination instead of in-memory variant.

In our code we filter and paginate in the following manner in-line:
```
    const { page = 1, limit = 3, category, author, readingStatus } = req.query;

    // Parse pagination parameters
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch the user
    const user = await User.findById(id);
if (category) {
      library = library.filter(book => book.category.includes(category));
    }
    if (author) {
      library = library.filter(book => book.authors.includes(author));
    }
    if (readingStatus) {
      console.log("reading status:", readingStatus);
      if (readingStatus === 'reading') {
        library = library.filter(book => book.reading === true);
      } else if (readingStatus === 'notReading') {
        library = library.filter(book => book.reading === false);
      } else {
        library = library;
      }
    }
    
    // Reverse the order of the library array to get the most recent books first
    library = library.reverse();

    const paginatedLibrary = library.slice((pageNumber - 1) * limitNumber, pageNumber * limitNumber);
    const totalPages = Math.ceil(library.length / limitNumber);

    return res.status(200).json({
      library: paginatedLibrary,
      totalPages,
    });
```
Instead of this we could have done the pagination and filtering through Mongoose aggregation which would reduce memory usage and improve performance by doing these operations at a database level, instead of in-line. Here's an example of how this could look:
```
async function getUserLibrary(userId, filters = {}, page = 1, limit = 10) {
  const matchStage = { userId };

  // Add filters directly in the query
  if (filters.genre) matchStage.genre = filters.genre;
  if (filters.publishedYear) matchStage.publishedYear = filters.publishedYear;

  // Use aggregation for filtering and pagination
  const books = await Book.aggregate([
    { $match: matchStage }, // Apply filters
    { $skip: (page - 1) * limit }, // Skip for pagination
    { $limit: limit }, // Limit results for pagination
  ]);

  return books;
}
```
