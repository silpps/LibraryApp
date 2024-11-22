const User = require("../models/userModel");
const mongoose = require("mongoose")

// Gets all users (admin rights required)
const getAllUsers = async (req, res) => {
//Try catches on all functions for better error handling, error message given to the user if the response fails
//Instead of repeated try-catch blocks, and LLM suggested using middleware such as express-async-handler. Will look into this or similar middleware next sprint
  try{
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
  } catch (error){
    res.status(500).json({message:"Failed to retrieve users", error:error.message})
  }
};

// Creates a user upon signup (POST)
//In this create operation as well as the update operation I was suggested to use validation such as Joi or validator.js libraries. This is something I'll look into next sprint
const createUser = async  (req, res) => {
  try{
    const newUser = await User.create({...req.body})
    res.status(201).json(newUser)
  } catch (error){
    res.status(400).json({message:"Failed to create user", error:error.message})
  }
};
 
// Gets all information of the user with the given id
const getUserById = async (req, res) => {
  const {userId} = req.params
//Checks if the given id is valid as per mongoose, was also suggested by LLM to add this as middleware to routes instead of repeating it here. Will look into this later.
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID", error:error.message });
  }

  try{
    //Excludes password from returned information for data security
    const user = await User.findById(userId).select("-password")
    if (user){
      res.status(200).json(user)
    } else {
      res.status(404).json({message:"Failed to retrieve user", error:error.message})
    } 
    }catch (error) {
     res.status(500).json({message:"Failed to retrieve user", error:error.message})
    }
  }
// Updates the given user's info
const updateUser = async (req, res) => {
  const {userId} = req.params

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID", error:error.message });
  }
  try{
  const updatedUser = await User.findOneAndUpdate(
    {_id: userId},
    {...req.body},
    {new: true}
  )
  if(updatedUser){
    res.status(200).json(updatedUser)
  } else {
    res.status(404).json({message:"User not found", error:error.message})
  }
  }catch(error){
    res.status(500).json({message:"Failed to update user", error:error.message})
  }
};

// Deletes the user with the given id
const deleteUser = async (req, res) => {
  const {userId} = req.params

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID", error:error.message });
  }
  try{
    const deletedUser = await User.findByIdAndDelete({_id:userId})
    if (deletedUser){
      //Used to be res.status(204).send() but was suggested by LLM to use the following instead, not sure if better practice?
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({message:"User not found", error:error.message})
    }
  } catch(error){
    res.status(500).json({message:"Failed to delete user", error:error.message})
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
