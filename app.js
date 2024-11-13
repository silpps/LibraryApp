const express = require("express");
const app = express();
const userRouter = require('./routes/userRouter');
const morgan = require("morgan")
app.use(morgan("tiny"))


// Middleware to parse JSON
app.use(express.json());
app.use('/bookhive/users', userRouter);


const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});