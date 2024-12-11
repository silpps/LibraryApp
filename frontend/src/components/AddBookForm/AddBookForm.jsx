import React, { useState } from 'react';
import './AddBookForm.css'
//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}/bookhive/library`;

const AddBookForm = ({ onAddBook, closeModal, allowRatingAndReview }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
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
    if (!year) missingFields.push('Publishing Year');
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

    const newBook = {
      title,
      authors,
      category,
      language,
      year: parseInt(year, 10),
      imageLink: allowRatingAndReview ? imageLink : null, // Use placeholder if imageLink is empty
      rating: allowRatingAndReview ? rating : null,
      review: allowRatingAndReview ? review : null,
    };

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
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

return(
  <div className="modal">
    <div className="modal-content">
      <h2>Add New Book</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
          <label>Authors: <input type="text" name="authors" onChange={(e) => setAuthors(e.target.value)} /></label>
          <label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
          <label>Language: <input type="text" name="language" onChange={(e) => setLanguage(e.target.value)}/></label>
          <label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
          {allowRatingAndReview && (
            <>
              <label>Image Link: <input type="text" name="imageLink" onChange={(e) => setImageLink(e.target.value)}/></label>
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