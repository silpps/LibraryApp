require('dotenv').config();

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
app.use(express.static('view')); // Serve static assets

app.use('/api/users', userRouter);
//the book path is for now called library. consider changing paths again when adding wishlist and readinglist
app.use('/api/library', bookRouter);

// Handle all other routes with the React app
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

module.exports = app;
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });