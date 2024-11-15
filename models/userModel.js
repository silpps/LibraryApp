const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture : {type: String, required: false},
    bookwormLevel: { type: Number, required: false},
    favoriteGenres: { type: Array, required: false },
    description: { type: String, required: false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);