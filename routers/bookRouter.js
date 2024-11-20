const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  filterBooksByCategory,
  filterBooksByAuthor,
  searchBooks,
} = require('../controllers/bookControllers');

// Paths of different functionalities should be re-evaluated.
//Take wishlist and reading list in consideration as they will be added in sprint 3.
// GET /books
router.get('/', getAllBooks);

// POST /books
router.post('/', addBook);

// SEARCH books
// GET /books/search?query=<value>
router.get('/search', searchBooks);

// GET /books/:bookId
router.get('/:bookId', getBookById);

// PUT /books/:bookId
router.put('/:bookId', updateBook);

// DELETE /books/:bookId
router.delete('/:bookId', deleteBook);

// FILTER books by category
// GET /books/filter?category=<value>
router.get('/filter/category/:category', filterBooksByCategory);

// FILTER books by author
// GET /books/filter?author=<value>
router.get('/filter/author/:author', filterBooksByAuthor);


module.exports = router;
