import React, { useState } from 'react';
import './AddBookForm.css'

const AddBookForm = ({ onAddBook, closeModal }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!title || !author || !category || !year) {
      setError('jooojaa!');
      return; 
    }
  
    setError('');
  
    onAddBook({
      id: Date.now(), 
      title,
      author,
      category,
      year: parseInt(year, 10),
      rating,
      review,
    });
  
    closeModal();
  };

return(
<div className="modal">
            <div className="modal-content">
                <h2>Add New Book</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={onAddBook}>
                    <label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
                    <label>Author: <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)} /></label>
                    <label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
                    <label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
                    <label>Rating: <input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/></label>
                    <label>Review: <textarea name="review" onChange={(e) => setReview(e.target.value)}></textarea></label>
                    <button type="submit">Add Book</button>
                    </form>
                    <button onClick={closeModal}>Close</button>
                </div>
        </div>
)};

export default AddBookForm;