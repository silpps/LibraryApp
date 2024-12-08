import React from 'react';
import './BookDetails.css'
//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const BookDetails = ({ book, onClose, onDelete }) => {

    const handleDelete = () => {
        deleteBook();
        onDelete(book.id);
        onClose();
    };

    const deleteBook = async () => {
      try{
        const userDataString = localStorage.getItem("userData")
        if (!userDataString){
          throw new Error("Data not found in localstorage (login again?)")
        }
        const userData = JSON.parse(userDataString);
        const token = userData.token;
        const res = await fetch(`${apiUrl}/library/${book._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
           },
        });
        if (!res.ok) {
          throw new Error("Failed to delete book");
        }
        console.log("Book deleted successfully");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    };

    const colourStars = (rating) => {
        if (rating === undefined || rating === null) {
          return <p style={{ color: '#777' }}>No rating yet</p>;
        }
    
        const stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(
            <span key={i} style={{ color: i < rating ? '#FFD700' : '#ccc' }}>
              ★
            </span> // colours the star depending on the rating
          );
        }
        return stars;
      };

    return (
      <div className="modal-overlay">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{book.title}</h2>
            <p>by {book.author}</p>
            <p>
            <strong>Category:</strong> {book.category}
            </p>
            <p>
            <strong>Language:</strong> {book.language}
            </p>
            <p>
            <strong>Published:</strong> {book.description}
            </p>
            <div className='stars'>
                {colourStars(book.rating)} 
            </div>
            {book.review && (
                <p>
                    <strong>Review:</strong> {book.review}
                </p> )}
            <div className="modal-buttons">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={onClose}>Back</button>
            </div>
        </div>
      </div>
    );
  };

  export default BookDetails;