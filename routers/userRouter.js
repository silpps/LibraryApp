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


// get all users (admin)
//This can also be utilised for "forgot password" as the system can check if an email address is linked to an account or something
router.get("/users", authorizeUsersAccess, getAllUsers);

//In signup page, pressing the signup button calls this
router.post("/signup", createUser);

//Is called from Log In button, will route to profile if correct, error otherwise
router.get("/profile/:userId", getUserById);

//Is called from the update changes button in profile settings
router.put("/profile/settings/:userId", updateUser);

// Is called from the delete profile button in profile settings
router.delete("/profile/settings/:userId", deleteUser);


module.exports = router;
