import React from 'react';
import './BookDetails.css'

const BookDetails = ({ book, onClose, onDelete }) => {

    const handleDelete = () => {
        onDelete(book.id);
        onClose();
      };

    const colourStars = (rating) => {
        if (rating === undefined || rating === null) {
          return <span style={{ color: '#777' }}>No rating yet</span>;
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
            <strong>Published:</strong> {book.year}
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
                <button onClick={onClose}>Close</button>
            </div>
        </div>
      </div>
    );
  };

  export default BookDetails;