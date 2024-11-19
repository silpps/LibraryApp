/* //Mock data -> data model is as follows
 {
    "title": "The Alchemist",
    "authors": "Paulo Coelho",
    "year": 1988,
    "language": "Portuguese",
    "category": "Fiction, Adventure",
    "image_link": "https://covers.openlibrary.org/b/id/8236525-L.jpg",
    "rating": 4,
    "review": "Amazing Book!!"
  }
    */

  const mongoose = require('mongoose');

  const Schema = mongoose.Schema;
  
  const bookSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image_link: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    review: {
      type: String,
      required: false,
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Book', bookSchema);