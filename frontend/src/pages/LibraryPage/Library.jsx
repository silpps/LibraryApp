import React, { useState, useEffect } from 'react';
import Book from '../../components/Book/Book';
import BookDetails from '../../modals/BookDetails/BookDetails';
import AddBookForm from '../../modals/AddBookForm/AddBookForm';
import './Library.css';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBookModal, setNewBookModal] = useState(false);
  const [filters, setFilters] = useState({ category: '', author: '', readingStatus: 'all' });
  const booksPerPage = 3;

  const fetchBooks = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) throw new Error('Data not found in localstorage (login again?)');
  
      const userData = JSON.parse(userDataString);
      const token = userData.token;
  
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: booksPerPage,
        category: filters.category,
        author: filters.author,
        readingStatus: filters.readingStatus,
      });
  
      const res = await fetch(`${apiUrl}/library/userLibrary?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
  
      const data = await res.json();
      setBooks(data.library); // Backend returns "library" in the response
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  

  useEffect(() => {
    fetchBooks();
  }, [currentPage, filters]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = () => fetchBooks();
  const handleUpdate = () => fetchBooks();
  const handleBookClick = (book) => setSelectedBook(book);
  const closeSelectedBook = () => setSelectedBook(null);
  const handleAddBook = () => setNewBookModal(true);
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  return (
    <div className="library">
      <h1 className='page-title'>My Library</h1>
      <div className="lib-content">
        <div className="left-div">

          <div className="filters-div">
            <Filter onFilterChange={handleFilterChange} />
          </div>
          <div className="profile-div">
            <h2>Go to</h2>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <Link to="/wishlist">
              <button>Wishlist</button>
            </Link>
          </div>
        </div>

        <div className="books-div">
          <div className="books-div-top">
            <h2>My collection</h2>
            <button className="add-book-btn" onClick={handleAddBook}>
              Add Book
            </button>
          </div>
          <div>
            {books.map((book) => (
              <Book key={book.id} book={book} onClick={() => handleBookClick(book)} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>

        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={closeSelectedBook}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}

        {newBookModal && (
          <AddBookForm
            onAddBook={() => fetchBooks()}
            closeModal={() => setNewBookModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Library;
