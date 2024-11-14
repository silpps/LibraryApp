const Book = require('../models/bookModel.js');

const getAllBooks = (req, res) => {
    res.json(Book.getAll());
};

const addBook = (req, res) => {
    const newBook = Book.addOne({ ...req.body }); //I had few problems here as there is few ways to handle the book data and I ended up mixing those.
    if (newBook) {
      res.status(201).json(newBook)
    } else {
      res.status(500).json({ message: "Fail to add a book" });
    }
};

const getBookById = (req, res) => {
    const bookId = req.params.bookId;
    const book = Book.findById(bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
};

const updateBook = (req, res) => {
    const bookId = req.params.bookId;
    const updatedBook = Book.updateOneById(bookId, { ...req.body }); // Spread the req.body object
  
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      // Handle update failure (e.g., book not found)
      res.status(404).json({ message: "Book not found" });
    }
};

const deleteBook = (req, res) => {
    const bookId = req.params.bookId;
    const isDeleted = Book.deleteOneById(bookId);
  
    if (isDeleted) {
      res.json({ message: "Book deleted successfully" });
    } else {
      // Handle deletion failure (e.g., book not found)
      res.status(404).json({ message: "Book not found" });
    }
};
  
  module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
  