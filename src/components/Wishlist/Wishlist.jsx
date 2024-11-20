import wishlistData from '../../WishListData.json';
import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';
import BookDetails from '../BookDetails/BookDetails';
import AddBookForm from '../AddBookForm/AddBookForm';
import './Wishlist.css';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [allBooks, setAllBooks] = useState(wishlistData);
    const [books, setBooks] = useState(wishlistData);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [newBookModal, setNewBookModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4;
  
    // Calculate the books to display on the current page
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  
    const totalPages = Math.ceil(books.length / booksPerPage);
  
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const goToPrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    //päivittää aina genre ja author listat kun kirjalista päivittyy (kirja poistetaan tai lisätään)
    useEffect(() => {
        const uniqueGenres = [...new Set(books.map((book) => book.category))];
        const uniqueAuthors = [...new Set(books.map((book) => book.author))];
        setGenres(uniqueGenres); 
        setAuthors(uniqueAuthors); 
      }, [books, allBooks]);

    
    //päivittää kirjalistan sitä mukaan mitä valitaan filtereistä
    useEffect(() => {
        setBooks(
          allBooks.filter((book) => {
            return (
              (!genreFilter || book.category === genreFilter) &&
              (!authorFilter || book.author === authorFilter)
            );
          })
        );
      }, [allBooks, genreFilter, authorFilter]);
    
      //
      const handleDelete = (id) => {
        const updatedBooks = allBooks.filter((book) => book.id !== id); 
        setAllBooks(updatedBooks); 
      };

      const handleBookClick = (book) => {
        setSelectedBook(book);
      };

      const closeSelectedBook = () => {
        setSelectedBook(null);
      };

      //handlers add book modaalille, modaali viel rikki tekee tyhjii kirjoi.

      const handleAddBook = () => {
        setNewBookModal(true);
      };
    
      const addNewBook = (newBook) => {
        if (newBook) {
            setAllBooks([...allBooks, newBook]);
            setNewBookModal(false);
        }
      };

      const navigate = useNavigate();
      
      const goToLibrary = () => {
        navigate('/library');
      };

    return (
        <div className='wishlist'>
            <h1>My Wishlist</h1>
            <div className='wishlist-content'>
                <div className="left-div">
                <div className="filters-div">
                    <h2>Filters</h2>
                    <div className='filter'>
                        <label htmlFor="genre"><strong>Filter by Genre:</strong></label>
                        <select
                        id="genre"
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                        >
                        <option value="">All Genres</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                            {genre}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className='filter'>
                        <label htmlFor="author"><strong>Filter by Author:</strong></label>
                        <select id="author" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
                        <option value="">All Authors</option>
                        {authors.map((author) => (
                            <option key={author} value={author}>
                            {author}
                            </option>
                        ))}
                        </select>
                    </div>
                    <button onClick={() => {
                        setGenreFilter(''); 
                        setAuthorFilter('');}
                        }>Reset Filters</button>
                </div>

                <div className='library-div'>
                    <h2>Back to Library</h2>
                    <button onClick={goToLibrary}>Library</button>
                </div>
            </div >

            <div className="books-div">
              <div className="books-div-top">
                <h2>My collection</h2>
                <button className="add-book-btn" onClick={handleAddBook}>Add Book</button>
              </div>
              <div>
              {currentBooks.map((book) => (
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
        </div>

        {selectedBook && (
            <BookDetails
            book={selectedBook}
            onClose={closeSelectedBook}
            onDelete={handleDelete}
            />
        )}

        {newBookModal && (
                <AddBookForm
                onAddBook={addNewBook}
                closeModal={() => setNewBookModal(false)}
                allowRatingAndReview={false}
                />
            )} 

        </div>
    );
  };

  export default Wishlist;