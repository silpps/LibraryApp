/* //Mock data -> data model is as follows
 {
    "title": "The Alchemist",
    "authors": "Paulo Coelho",
    "description": "1988 asdgfdhdfgdfg",
    "language": "Portuguese",
    "category": "Fiction, Adventure",
    "image_link": "https://covers.openlibrary.org/b/id/8236525-L.jpg",
    "rating": 4,
    "review": "Amazing Book!!"
  }
    */

  const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  
  // The LLM suggested that I should add indexes to the fields that are queried frequently. This will improve the performance of the queries. I'm not sure how that could help but I will look into it.
  // I should also re-evaluate the data model and consider adding more fields to the schema. I should discuss this with the team.
  // In the current version the book schema represent library data. Look if you can reuse the schema for wishlist and reading list.
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  image_link: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
    min: 0,        //validation for rating making sure it is between 0 and 5
    max: 5
  },
  review: {
    type: String,
    required: false,
  }
}, { timestamps: true });

bookSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const Book = mongoose.model("Book", bookSchema)

module.exports = {
  bookSchema,
  Book,
}