const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {bookSchema} = require("./bookModel")


//Some of this will be changed, profilepicture as a string, and upon frontend and backend integration might have to refactor a bit.
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture : {type: String, required: false},
    bookwormLevel: { type: Number, required: false, min:0, default: 0},
    favoriteGenres: { type: Array, required: false },
    description: { type: String, required: false},
    library: {type: [bookSchema], required: true},
    wishlist:{type: [bookSchema], required: true}
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});


module.exports = mongoose.model("User", userSchema);