import React, { useState } from 'react';
import './AddBookForm.css'

const AddBookForm = ({ onAddBook, closeModal, allowRatingAndReview }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    // seeing if any of the fields are empty
    let missingFields = [];

    if (!title) missingFields.push('Title');
    if (!author) missingFields.push('Author');
    if (!category) missingFields.push('Genre');
    if (!year) missingFields.push('Publishing Year');
    if (!language) missingFields.push('Language');
    if (allowRatingAndReview) {
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
    // if rating and review are not allowed, set them to null
    if (!allowRatingAndReview) {

    onAddBook({
      id: Date.now(), 
      title,
      author,
      category,
      language,
      year: parseInt(year, 10),
      rating : null,
      review : null,
    });
    } // if rating and review are allowed, add them to the book
    else {
      onAddBook({
        id: Date.now(), 
        title,
        author,
        category,
        language,
        year: parseInt(year, 10),
        rating,
        review,
      });
    }

  };

return(
  <div className="modal">
    <div className="modal-content">
      <h2>Add New Book</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
          <label>Author: <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)} /></label>
          <label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
          <label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
          <label>Language: <input type="text" name="language" onChange={(e) => setLanguage(e.target.value)}/></label>
          {allowRatingAndReview && (
            <>
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