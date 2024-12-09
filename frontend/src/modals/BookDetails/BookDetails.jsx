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
    authors: book.authors || '',
    description: book.description || '',
    language: book.language || '',
    category: book.category || '',
    imageLink: book.imageLink || null,
    rating: book.rating || null,
    review: book.review || '',
    reading: book.reading || false,
  });

  useEffect(() => {
    setEditedBook({
      title: book.title || '',
      authors: book.authors || '',
      description: book.description || '',
      language: book.language || '',
      category: book.category || '',
      imageLink: book.imageLink || null,
      rating: book.rating || null,
      review: book.review || '',
      reading: book.reading || false,
    });
  }, [book]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook();
      onDelete(book.id);
      onClose();
    }
  };

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
        : `${apiUrl}/library/userWishlist/${book._id}`;

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

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const editBook = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("Data not found in localstorage (login again?)");
      }
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const path = location.pathname === '/library'
        ? `${apiUrl}/library/${book._id}`
        : `${apiUrl}/library/userWishlist/${book._id}`;

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


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to save changes?")) {
      editBook();
    }
  };

  const moveBookToLibrary = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("Data not found in localstorage (login again?)");
      }
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      // Delete from wishlist
      const deleteRes = await fetch(`${apiUrl}/library/userWishlist/${book._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (!deleteRes.ok) {
        throw new Error("Failed to delete book from wishlist");
      }

      // Add to library
      const addRes = await fetch(`${apiUrl}/library/userLibrary/addBookToLibrary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(book),
      });

      if (!addRes.ok) {
        throw new Error("Failed to add book to library");
      }

      console.log("Book moved to library successfully");
      onDelete(book.id);
      onClose();
    } catch (error) {
      console.error("Error moving book to library:", error);
    }
  };

  const moveToLibrary = async () => {
    window.confirm("Are you sure you want to move this book to your library?"); {
      moveBookToLibrary();
    }
  }

  const handleCancelEdit = () => {
    if (window.confirm("Are you sure you want to cancel the changes?")) {
      setIsEditing(false);
    }
  };

  const colourStars = (rating) => {
    if (rating === undefined || rating === null || rating === 0) {
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
                value={editedBook.authors}
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
            {location.pathname === '/library' && (
              <>
                <label>
                  Add to readinglist:
                  <input 
                  type="checkbox" 
                  name="reading"
                  checked={editedBook.reading}
                  onChange={handleEditChange}/>
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
              </>
            )}
            <div className="modal-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2>{editedBook.title}</h2>
            <p>by {editedBook.authors}</p>
            {location.pathname === '/library' && editedBook.reading && (
            <p>Now reading</p>
          )}
            <p>
              <strong>Category:</strong> {editedBook.category}
            </p>
            <p>
              <strong>Language:</strong> {editedBook.language}
            </p>
            <p>
              <strong>Description:</strong> {editedBook.description}
            </p>
            {location.pathname === '/library' && (
              <>
                <div className="stars">{colourStars(editedBook.rating)}</div>
                {editedBook.review && (
                  <p>
                    <strong>Review:</strong> {editedBook.review}
                  </p>
                )}
              </>
            )}
            <div className="modal-buttons">
              <button onClick={handleDelete}>Delete</button>
              {location.pathname === '/wishlist' && (
                <button onClick ={moveToLibrary}>Move to Library</button>)}
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