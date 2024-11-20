const Book = require('../models/bookModel.js');
const mongoose = require("mongoose");

// Controller function to get all books
// GET /books
const getAllBooks = async (req, res) => {
  try {
    // this line fetches all books and sorts them by createdAt timestamp in descending order.
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

// Controller function to add a new book
// POST /books
const addBook = async (req, res) => {
  //No validation for req.body. Consider validating fields like title, author, etc.
  try {
    const newBook = await Book.create({ ...req.body });// Spread the request body into the new book object
    res.status(201).json(newBook); // Returns the newly created book with a 201 status.
  } catch (error) {
    //Error handling is present, but it could be more specific.
    res.status(400).json({ message: "Failed to add book", error: error.message });
  }
};

// Controller function to get a book by ID
// GET /books/:bookId
const getBookById = async (req, res) => {
  const { bookId } = req.params;

  // id validation. ID validation is performed here to prevent invalid MongoDB ObjectId errors.
  // maybe consider using a dedicated middleware to handle validation for all routes with ObjectId.
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

// Controller function to update a book by ID
// PUT /books/:bookId
const updateBook = async (req, res) => {
  const { bookId } = req.params;

  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    { ...req.body },
    { new: true }
  );
  if (updatedBook) {
    res.status(200).json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// Controller function to delete a book by ID
// DELETE /books/:bookId
const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  // id validation
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    //This method finds a single car document by its ID and deletes it from the database.
    const deletedBook = await Book.findOneAndDelete({ _id: bookId });
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};
  
// Export all controller functions
module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
  