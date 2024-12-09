import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AddBookForm.css'
//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const AddBookForm = ({ onAddBook, closeModal }) => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState(null);
  const [reading, setReadingList] = useState(false);
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
      imageLink: location.pathname === '/library'  ? imageLink : null, // Use placeholder if imageLink is empty
      rating: location.pathname === '/library' ? rating : null,
      review: location.pathname === '/library' ? review : null,
      reading,
      id
    };
    console.log(newBook)
    addBook(newBook);


  };

  const addBook = async (newBook) => {


    //For authorization
    const userDataString = localStorage.getItem("userData")
    if (!userDataString){
      throw new Error("Data not found in localstorage (login again?)")
    }
    
    const userData = JSON.parse(userDataString)
    const token = userData.token

    const path = location.pathname === '/library'
      ? `${apiUrl}/library/userLibrary/addBookToLibrary`
      : `${apiUrl}/library/userWishlist/addBookToWishlist`;


    try {
      const res = await fetch(path, {
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

return(
  <div className="modal">
    <div className="modal-content">
      <h2>{location.pathname === '/library' ? 'Add to Library' : 'Add to Wishlist'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
          <label>Authors: <input type="text" name="authors" onChange={(e) => setAuthors(e.target.value)} /></label>
          <label>Description: <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/></label>
          <label>Language: <input type="text" name="language" onChange={(e) => setLanguage(e.target.value)}/></label>
          <label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
          {location.pathname === '/library' && (
            <>
            <label>
              <input type="checkbox" onChange={(e) => setReadingList(e.target.checked)}/>Add to Reading List</label>
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