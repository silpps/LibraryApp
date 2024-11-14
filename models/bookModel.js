/* //Mock data -> data model is as follows
 {
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "year": 1988,
    "language": "Portuguese",
    "category": "Fiction, Adventure",
    "imageLink": "https://covers.openlibrary.org/b/id/8236525-L.jpg"
  }
    */

let bookArray = require('../bookData.json');
let nextId = bookArray.length + 1;

function getAll() {
    return bookArray;
}

function addOne(bookData) {
    const {title, author, year, language, category, imageLink} = bookData;
    // Check if any parameter is undefined
    if (!title || !author || !year || !language || !category || !imageLink) {
        return false;
    }

    const newBook = {
        id: nextId++,
        ...bookData,
    };

    bookArray.push(newBook);
    return newBook;
}

function findById(id) {
    const numericId = Number(id);
    const item = bookArray.find((item) => item.id === numericId);
    return item || false;
  }
  
  function updateOneById(id, updatedData) {
    const book = findById(id);
    if (book) {
      Object.assign(book, updatedData);
      return book;
    }
    return false;
  }
  
  function deleteOneById(id) {
    const item = findById(id);
    if (item) {
      const initialLength = bookArray.length;
      bookArray = bookArray.filter((item) => item.id !== Number(id));
      return bookArray.length < initialLength;
    }
    return false;
  }

  const Book = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById,
  };
  
  module.exports = Book;