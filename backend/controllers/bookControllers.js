const {Book} = require('../models/bookModel.js');
const User = require("../models/userModel.js")
const mongoose = require("mongoose");

// The LLM suggests that the error handling could be more specific. I should look into that.
// The LLM also suggest me to consider adding validation for the request body and query parameters. It says that keeping validation on both the frontend and backend ensures that each layer of the application is responsible for its own data integrity.

// Controller function to get all books
// GET /library
const getAllBooks = async (req, res) => {
  try {
    // this line fetches all books and sorts them by createdAt timestamp in descending order.
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

//Controller for fetching the three most recent books
// GET /library/recent
const getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recent books" });
  }
};

// Controller function to add a new book
// POST /books
const addBookToLibrary = async (req, res) => {
  //No validation for req.body. Consider validating fields like title, author, etc.
  const {title, authors, year, language, category, image_link, rating, review, id} = req.body
  const user = await User.findById(id)
  console.log(user)
  console.log(user)
  try {
    const newBook = {
      title,
      authors,
      year,
      language,
      category,
      image_link,
      rating,
      review
    };// Spread the request body into the new book object
    console.log(newBook)
    user.library.push(newBook)
    await user.save()
    res.status(201).json(newBook); // Returns the newly created book with a 201 status.
  } catch (error) {
    //Error handling is present, but it could be more specific.
    res.status(400).json({ message: "Failed to add book", error: error.message });
  }
};

const getBooksByUser = async (req, res) => {
  const { id } = req.body; 

  // Validate the provided user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    
    if (user) {
      res.status(200).json({ library: user.library });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user's library", error: error.message });
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

// Controller function to update a book by ID
// PUT /books/:bookId
const updateBook = async (req, res) => {
  const { bookId } = req.params;

   // id validation. ID validation is performed here to prevent invalid MongoDB ObjectId errors.
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
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
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error: error.message });
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

//ADDITIONAL FUNCTIONALITIES

//This version of the filter will show all the books that has given category. It also shows false results like non-fiction when fiction is searched. this should be fixed eventually.
//This could be improved. Maybe consider modifying regex to match the category anywhere in the string and see if that works better.
// Get books by category
const filterBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({  category: { $regex: req.params.category, $options: "i" }  });

    // If no books match the category return a messag notifying that
    if (books.length === 0) {
      return res.status(404).json({ message: `No books found for category: ${category}` });
    }
    res.status(200).json(books);
  } catch (error) {
    console.error("Error filtering books by category:", error); // Debugging line
    res.status(500).json({ message: "Failed to filter books by category", error: error.message });
  }
};

// Filter books by author
const filterBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({  authors: { $regex: req.params.author, $options: "i" }  }); // Regex match to start with 'Fiction' and case-insensitive
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter books by author", error: error.message });
  }
};

// Search books (title, author and prioritize title matches)
const searchBooks = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  //consider different search options. 
  //LLM suggsted that I should consider adding pagination to the search results to improve performance and user experience. I should look into that.
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { authors: { $regex: query, $options: "i" } },
      ]
    }).sort({ title: -1 }); // Sort results by title match (descending)

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to search books", error: error.message });
  }
};

  
// Export all controller functions
module.exports = {
    getAllBooks,
    getBooksByUser,
    getRecentBooks,
    getBookById,
    addBookToLibrary,
    updateBook,
    deleteBook,
    filterBooksByCategory,
    filterBooksByAuthor,
    searchBooks,
};
  