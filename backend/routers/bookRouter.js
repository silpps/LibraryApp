const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getRecentBooks,
  getBookById,
  addBookToLibrary,
  updateBook,
  deleteBook,
  filterBooksByCategory,
  filterBooksByAuthor,
  searchBooks,
  getUserLibrary,
  getUserWishlist
} = require('../controllers/bookControllers');

const { authorizeUsersAccess } = require("../middleware/auth");

// I've encountered some issues with the route paths and think that the routes and the route order should be re-evaluated. This version works for now but I will look into it later.
//Take wishlist and reading list in consideration as they will be added in sprint 3.

//First I had the search route after the filter routes but I ended up having invalid bookId errors. The reason was due to Express the dynamic bookId route before the search route. Reordering the routes fixed the issue.
// GET /books
//router.get('/', getAllBooks);
//Get user's library when moving to library
router.post("/userLibrary", authorizeUsersAccess, getUserLibrary)
//Get User's wishlist when moving to it
router.post("/userWishlist", authorizeUsersAccess, getUserWishlist)

// POST /books
router.post('/userLibrary/addBookToLibrary',authorizeUsersAccess, addBookToLibrary);

// SEARCH books
// GET /books/search?query=<value>
router.get('/search', searchBooks);

//recent books
// GET /books/recent
router.get('/recent', getRecentBooks);

// GET /books/:bookId
router.get('/:bookId', getBookById);

// PUT /books/:bookId
router.put('/:bookId',authorizeUsersAccess, updateBook);

// DELETE /books/:bookId
router.delete('/:bookId',authorizeUsersAccess, deleteBook);

// FILTER books by category
// GET /books/filter?category=<value>
router.get('/filter/category/:category', filterBooksByCategory);

// FILTER books by author
// GET /books/filter?author=<value>
router.get('/filter/author/:author', filterBooksByAuthor);


module.exports = router;
