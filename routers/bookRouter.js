const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookControllers');

// GET /books
router.get('/', getAllBooks);

// POST /books
router.post('/', addBook);

// GET /books/:bookId
router.get('/:bookId', getBookById);

// PUT /books/:bookId
router.put('/:bookId', updateBook);

// DELETE /books/:bookId
router.delete('/:bookId', deleteBook);

module.exports = router;
