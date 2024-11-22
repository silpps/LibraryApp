require('dotenv').config()
const connectDB = require("./config/db");
const express = require("express");
const app = express();
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const morgan = require("morgan")
app.use(morgan("tiny"))

const port=process.env.PORT || 4000;
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/bookhive', userRouter);
app.use('/bookhive/books', bookRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});