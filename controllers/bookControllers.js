const Book = require('../models/bookModel.js');
const mongoose = require("mongoose");

const getAllBooks = async (req, res) => {
  try {
    // this line fetches all books and sorts them by createdAt timestamp in descending order.
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = await Book.create({ ...req.body });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to add book", error: error.message });
  }
};

const getBookById = async (req, res) => {
  const { bookId } = req.params;

  // id validation
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

const updateBook = async (req, res) => {
  const { bookId } = req.params;

  // id validation
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    const updatedData = {
      ...existingBook.toObject(),
      ...req.body, // Override with new data
    };
    
    const updatedBook = await Book.findOneAndReplace(
      { _id: bookId },
      updatedData,
      { new: true }
    );
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update book" });
  }
};

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
  
  module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
  