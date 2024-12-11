const express = require('express');
const router = express.Router();

const {
  getRecentBooks,
  addBookToLibrary,
  updateBook,
  deleteBook,
  getUserLibrary,
  getUserWishlist,
  addBookToWishlist,
  updateBookInWishlist,
  deleteBookInWishlist,
  getCatergoriesAndAuthors
} = require('../controllers/bookControllers');

const { authorizeUsersAccess } = require("../middleware/auth");

// I've encountered some issues with the route paths and think that the routes and the route order should be re-evaluated. This version works for now but I will look into it later.
//Take wishlist and reading list in consideration as they will be added in sprint 3.

//First I had the search route after the filter routes but I ended up having invalid bookId errors. The reason was due to Express the dynamic bookId route before the search route. Reordering the routes fixed the issue.
// GET /books
//router.get('/', getAllBooks);
//Get user's library when moving to library
router.get("/userLibrary", authorizeUsersAccess, getUserLibrary)

//Get User's wishlist when moving to it
router.get("/userWishlist", authorizeUsersAccess, getUserWishlist)

router.get('/recentBooks', authorizeUsersAccess, getRecentBooks)

// POST /books
router.post('/userLibrary/addToLibrary',authorizeUsersAccess, addBookToLibrary);

router.get('/filter/:libType',authorizeUsersAccess, getCatergoriesAndAuthors)


// PUT /books/:bookId
router.put('/userLibrary/:bookId',authorizeUsersAccess, updateBook);

// DELETE /books/:bookId
router.delete('/userLibrary/:bookId',authorizeUsersAccess, deleteBook);


//recent books
// GET /books/recent
router.get('/recent', getRecentBooks);

router.post("/userWishlist/addToWishlist", authorizeUsersAccess, addBookToWishlist)
router.put("/userWishlist/:bookId", authorizeUsersAccess, updateBookInWishlist)
router.delete("/userWishlist/:bookId", authorizeUsersAccess, deleteBookInWishlist)




module.exports = router;
