import React, { useState } from 'react';
import './AddBookForm.css'
//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const AddBookForm = ({ onAddBook, closeModal, allowRatingAndReview }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    // seeing if any of the fields are empty
    let missingFields = [];

    if (!title) missingFields.push('Title');
    if (!authors) missingFields.push('Authors');
    if (!category) missingFields.push('Genre');
    if (!description) missingFields.push('Description');
    if (!language) missingFields.push('Language');
    if (allowRatingAndReview) {
      if (!imageLink) missingFields.push('Image Link');
      if (!rating) missingFields.push('Rating');
      if (!review) missingFields.push('Review');
    }

    // if there are missing fields, show an error message
    if (missingFields.length > 0) {
      if (missingFields.length === 1) {
        setError(`Please fill in the missing field: ${missingFields[0]}`);
      } else {
        setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
      }
      return;
    }
    
    setError('');
    //For authorization
    const userDataString = localStorage.getItem("userData")
    if (!userDataString){
      throw new Error("Data not found in localstorage (login again?)")
    }
    //Given data is converted to a JS object
    const userData = JSON.parse(userDataString)
    //Take the id and token from the request
    const id = userData.id

    const newBook = {
      title,
      authors,
      category: [category],
      language,
      description,
      imageLink: allowRatingAndReview ? imageLink : null, // Use placeholder if imageLink is empty
      rating: allowRatingAndReview ? rating : null,
      review: allowRatingAndReview ? review : null,
      id
    };
    console.log(newBook)
    addBook(newBook);

    

    //HUOM! jätän tän vanhan koodin tähän, jos tarvii vertailla. sori mut oli pakko muokkaa ku mul oli muuten hankala hahmottaa

    // if (!allowRatingAndReview) {

    //   onAddBook({
    //     id: Date.now(), 
    //     title,
    //     author,
    //     category,
    //     language,
    //     year: parseInt(year, 10),
    //     rating : null,
    //     review : null,
    //   });
    //   } // if rating and review are allowed, add them to the book
    //   else {
    //     onAddBook({
    //       id: Date.now(), 
    //       title,
    //       author,
    //       category,
    //       language,
    //       year: parseInt(year, 10),
    //       rating,
    //       review,
    //     });
    //   }

  };

  const addBook = async (newBook) => {


    //For authorization
    const userDataString = localStorage.getItem("userData")
    if (!userDataString){
      throw new Error("Data not found in localstorage (login again?)")
    }
    
    const userData = JSON.parse(userDataString)
    const token = userData.token
    try {
      const res = await fetch(`${apiUrl}/library/userLibrary/addBookToLibrary`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' ,
                  "Authorization": `Bearer ${token}`},
        body: JSON.stringify(newBook),
      });
      if (res.ok) {
        console.log('Book added successfully!');
        onAddBook(newBook); // Call the onAddBook callback
        closeModal();
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const searchBook = async () => {
    try{
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${authors}`);
      const data = await res.json();
      const bookData = data.items[0].volumeInfo;
      console.log(bookData);
      setTitle(bookData.title || '');
      setAuthors(bookData.authors[0] || '');
      setDescription(bookData.description || '');
      setLanguage(bookData.language || '');
      setCategory(bookData.categories || '');
      setImageLink(bookData.imageLinks.thumbnail || '');
    } catch (error) {
      console.error('Error searching book:', error);
    }
  };

return(
  <div className="modal">
    <div className="modal-content">
      <h2>Add New Book</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/></label>
          <label>Authors: <input type="text" name="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} /></label>
          <button onClick={searchBook}>Search</button>
          <label>Description: <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/></label>
          <label>Language: <input type="text" name="language" value={language} onChange={(e) => setLanguage(e.target.value)}/></label>
          <label>Genre: <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} /></label>
          {allowRatingAndReview && (
            <>
              <label>Image Link: <input type="text" name="imageLink" value={imageLink} onChange={(e) => setImageLink(e.target.value)}/></label>
              <label>Rating:<input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/> </label>
              <label>Review:<textarea name="review" onChange={(e) => setReview(e.target.value)}></textarea></label>
            </>
          )}
          <button type="submit">Add Book</button>
        </form>
        <button onClick={closeModal}>Back</button>
    </div>
  </div>
)};

export default AddBookForm;