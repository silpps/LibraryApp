const {Book} = require('../models/bookModel.js');
const User = require("../models/userModel.js")
const mongoose = require("mongoose");

// The LLM suggests that the error handling could be more specific. I should look into that.
// The LLM also suggest me to consider adding validation for the request body and query parameters. It says that keeping validation on both the frontend and backend ensures that each layer of the application is responsible for its own data integrity.


//Controller for fetching the three most recent books
// GET /library/recent
const getRecentBooks = async (req, res) => {
  const id = req.user._id;
  // Validate the provided user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(id);
    if (user) {
      const books = user.library.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
      res.status(200).json(books);
      console.log("Get recent successful")
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recent books" });
  }
};

// Controller function to add a new book
// POST /books
//Adds a book to the given USER'S library (User's id is given in the request (which is taken from localStorage after being saved there upon login))
const addBookToLibrary = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { title, authors, language, category, image_link, rating, review, reading } = req.body;

    const newBook = new Book({
      title,
      authors,
      language,
      category,
      image_link: image_link || "",
      rating: Number(rating),
      review: review || "",
      reading: reading || false
    });

    console.log("New Book Object:", newBook);

    // Push validated book to the library
    user.library.push(newBook);

    console.log("Library Before Save:", user.library);

    // Save updated user
    await user.save();

    console.log("Library Saved Successfully");
    res.status(201).json({ message: "Book added to library successfully", library: user.library });

  } catch (error) {
    console.error("Error Adding Book:", error.message);
    if (error.errors) {
      console.error("Validation Errors:", Object.values(error.errors).map(err => err.message));
    }
    res.status(400).json({ message: "Failed to add book", error: error.message });
  }
};


const getUserLibrary = async (req, res) => {
  const id = req.user._id;

  // Validate the provided user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const { page = 1, limit = 3, category, author, readingStatus } = req.query;

    // Parse pagination parameters
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch the user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let library = user.library || [];

    if (!Array.isArray(library)) {
      return res.status(400).json({ message: "Library is not properly formatted" });
    }

    // Apply filters
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
  } catch (error) {
    console.error("Error fetching user's library:", error);
    res.status(500).json({ message: "Failed to retrieve user's library", error: error.message });
  }
};

// Controller function to update a book by ID
// PUT /books/:bookId
const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user._id; // Assuming the user's ID is available in req.user

  // ID validation
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book in the user's library
    const bookIndex = user.library.findIndex(book => book._id.toString() === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in user's library" });
    }

    // Update the book details
    const updatedBook = {
      ...user.library[bookIndex]._doc,
      ...req.body,
    };

    user.library[bookIndex] = updatedBook;
    await user.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};


// Controller function to delete a book by ID
// DELETE /books/:bookId
const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user._id; // Assuming the user's ID is available in req.user

  // ID validation
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book in the user's library and remove it
    const bookIndex = user.library.findIndex(book => book._id.toString() === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in user's library" });
    }

    user.library.splice(bookIndex, 1); // Remove the book from the library array
    await user.save();

    res.status(204).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};


// Controller function to get a book by ID
// GET /books/:bookId
const getBookById = async (req, res) => {
  const { bookId } = req.params;

  // id validation. ID validation is performed here to prevent invalid MongoDB ObjectId errors.
  // maybe consider using a dedicated middleware to handle validation for all routes with ObjectId. That would reduse code duplication.
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve book" });
  }
};

//WISHLIST CONTROLLERS
// Controller function to add a book to the user's wishlist
const addBookToWishlist = async (req, res) => {

  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //No validation for req.body. Consider validating fields like title, author, etc.
  const {title, authors, language, category, image_link, rating, review, reading} = req.body
  //Finds the user by the given id
  console.log(user)
  try {
    const newBook = {
      title,
      authors,
      language,
      category,
      image_link,
      rating,
      review,
      reading: reading || false
    };// Spread the request body into the new book object
    console.log(newBook)
    //Adds the book to the user's library
    user.wishlist.push(newBook)
    await user.save()
    res.status(201).json(newBook); // Returns the newly created book with a 201 status.
  } catch (error) {
    //Error handling is present, but it could be more specific.
    res.status(400).json({ message: "Failed to add book", error: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  const id = req.user._id;

  // Validate the provided user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const { page = 1, limit = 3, category, author, readingStatus } = req.query;

    // Parse pagination parameters
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch the user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlist = user.wishlist || [];

    if (!Array.isArray(wishlist)) {
      return res.status(400).json({ message: "Wishlist is not properly formatted" });
    }

    if (category) {
      wishlist = wishlist.filter(book => book.category.includes(category));
    }
    if (author) {
      wishlist = wishlist.filter(book => book.authors.includes(author));
    }
    if (readingStatus) {
      console.log("reading status:", readingStatus);
      if (readingStatus === 'reading') {
        wishlist = wishlist.filter(book => book.reading === true);
      } else if (readingStatus === 'notReading') {
        wishlist = wishlist.filter(book => book.reading === false);
      } else {
        wishlist = wishlist;
      }
    }

    // Reverse the order of the wishlist array to get the most recent books first
    wishlist = wishlist.reverse();

    const paginatedWishlist = wishlist.slice((pageNumber - 1) * limitNumber, pageNumber * limitNumber);
    const totalPages = Math.ceil(wishlist.length / limitNumber);

    return res.status(200).json({
      wishlist: paginatedWishlist,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching user's wishlist:", error);
    res.status(500).json({ message: "Failed to retrieve user's wishlist", error: error.message });
  }
};

//Update a book in the user's wishlist
const updateBookInWishlist = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user._id; // Assuming the user's ID is available in req.user

  // ID validation
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book in the user's library
    const bookIndex = user.wishlist.findIndex(book => book._id.toString() === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in user's wishlist" });
    }

    // Update the book details
    const updatedBook = {
      ...user.wishlist[bookIndex]._doc,
      ...req.body,
    };

    user.wishlist[bookIndex] = updatedBook;
    await user.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};


// Delete a book from the wishlist
const deleteBookInWishlist = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user._id; // Assuming the user's ID is available in req.user

  // ID validation
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book in the user's wishlsit and remove it
    const bookIndex = user.wishlist.findIndex(book => book._id.toString() === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in user's wishlist" });
    }

    user.wishlist.splice(bookIndex, 1); // Remove the book from the wishlist array
    await user.save();

    res.status(204).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

//ADDITIONAL FUNCTIONALITIES


const getCatergoriesAndAuthors = async (req, res) => {
  const libType = req.params.libType;
  const userId = req.user._id; // Assuming the user's ID is available in req.user

  // ID validation
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (libType === "lib") {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const categories = user.library.map(book => book.category);
      const authors = user.library.map(book => book.authors);
      const filters = {
        categories: [...new Set(categories.flat())], // Remove duplicates and flatten array
        authors: [...new Set(authors.flat())], // Remove duplicates and flatten array
      };

      res.status(200).json(filters);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve categories and authors", error: error.message });
    }
  }
  else if (libType === "wish") {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const categories = user.wishlist.map(book => book.category);
      const authors = user.wishlist.map(book => book.authors);
      const filters = {
        categories: [...new Set(categories.flat())], // Remove duplicates and flatten array
        authors: [...new Set(authors.flat())], // Remove duplicates and flatten array
      };

      res.status(200).json(filters);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve categories and authors", error: error.message });
    }
  }
};

  
// Export all controller functions
module.exports = {
    getUserLibrary,
    getUserWishlist,
    getRecentBooks,
    getBookById,
    addBookToLibrary,
    updateBook,
    deleteBook,
    addBookToWishlist,
    updateBookInWishlist,
    deleteBookInWishlist,
    getCatergoriesAndAuthors,
};
