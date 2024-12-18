require('dotenv').config();

const connectDB = require("./config/db");
const express = require("express");
const app = express();
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');

const morgan = require("morgan")
app.use(morgan("tiny"))

connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('view')); // Serve static assets

app.use('/api/users', userRouter);
//the book path is for now called library. consider changing paths again when adding wishlist and readinglist
app.use('/api/library', bookRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });