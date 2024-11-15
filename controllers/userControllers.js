const User = require("../models/userModel");

// GET /cars
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};
 
// POST /cars
const createUser = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  res.status(201).json(newUser);
};

// GET /cars/:carId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// PUT /cars/:carId
const updateUser = async (req, res) => {
  const { userId } = req.params;

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { ...req.body },
    { new: true }
  );
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
};

// DELETE /cars/:carId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: userId });
  if (deletedUser) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
