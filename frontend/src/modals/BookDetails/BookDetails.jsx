import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BookDetails.css';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const BookDetails = ({ book, onClose, onDelete, onUpdate }) => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: book.title || '',
    author: book.author || '',
    category: book.category || '',
    language: book.language || '',
    description: book.description || '',
    rating: book.rating || '',
    review: book.review || ''
  });

  // Update the edited book on the modal when the book prop changes
  useEffect(() => {
    setEditedBook({
      title: book.title || '',
      author: book.author || '',
      category: book.category || '',
      language: book.language || '',
      description: book.description || '',
      rating: book.rating || '',
      review: book.review || ''
    });
  }, [book]);

  // Delete a book from the library or wishlist
  const handleDelete = () => {
    deleteBook();
    onDelete(book.id);
    onClose();
  };

  // Delete a book from the library or wishlist
  const deleteBook = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("Data not found in localstorage (login again?)");
      }
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const path = location.pathname === '/library'
        ? `${apiUrl}/library/${book._id}`
        : `${apiUrl}/wishlist/${book._id}`;

      const res = await fetch(path, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle form submission for editing a book
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("Data not found in localstorage (login again?)");
      }
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const path = location.pathname === '/library'
        ? `${apiUrl}/library/${book._id}`
        : `${apiUrl}/wishlist/${book._id}`;

      const res = await fetch(path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editedBook),
      });

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await res.json();
      onUpdate(updatedBook);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Colour the stars based on the rating
  const colourStars = (rating) => {
    if (rating === undefined || rating === null) {
      return <p style={{ color: '#777' }}>No rating yet</p>;
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#FFD700' : '#ccc' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <h2>Edit Book Details</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editedBook.title}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={editedBook.author}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={editedBook.category}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Language:
              <input
                type="text"
                name="language"
                value={editedBook.language}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editedBook.description}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                value={editedBook.rating}
                onChange={handleEditChange}
                min="1"
                max="5"
              />
            </label>
            <label>
              Review:
              <textarea
                name="review"
                value={editedBook.review}
                onChange={handleEditChange}
              />
            </label>
            <div className="modal-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2>{editedBook.title}</h2>
            <p>by {editedBook.author}</p>
            <p>
              <strong>Category:</strong> {editedBook.category}
            </p>
            <p>
              <strong>Language:</strong> {editedBook.language}
            </p>
            <p>
              <strong>Description:</strong> {editedBook.description}
            </p>
            <div className="stars">{colourStars(editedBook.rating)}</div>
            {editedBook.review && (
              <p>
                <strong>Review:</strong> {editedBook.review}
              </p>
            )}
            <div className="modal-buttons">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={onClose}>Back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;