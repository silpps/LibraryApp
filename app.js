require('dotenv').config();
const port = process.env.PORT || 4000;

const connectDB = require("./config/db");
const express = require("express");
const app = express();
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const morgan = require("morgan")
app.use(morgan("tiny"))


connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/bookhive', userRouter);
//the book path is for now called library. consider changing paths again when adding wishlist and readinglist
app.use('/bookhive/library', bookRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});