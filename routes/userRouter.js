const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  } = require("../controllers/userControllers")

const { authorizeUsersAccess } = require("../middleware/auth");

// ROUTES
// GET /users
router.get("/", authorizeUsersAccess, getAllUsers);

// POST /users
router.post("/", createUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.put("/:userId", updateUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);
module.exports = router;
