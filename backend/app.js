require('dotenv').config();
const port = process.env.PORT || 4000;

const connectDB = require("./config/db");
const express = require("express");
const app = express();
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const cors = require("cors");

const morgan = require("morgan")
app.use(morgan("tiny"))

app.use(cors())
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/api/users', userRouter);
//the book path is for now called library. consider changing paths again when adding wishlist and readinglist
app.use('/api/library', bookRouter);

module.exports = app;
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });