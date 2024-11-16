import booksData from '../../BookData.json';
import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';
import Header from '../Header/Header';
import BookDetails from '../Book/BookDetails';
import AddBookForm from '../AddBookForm/AddBookForm';
import './Library.css'

const Library = () => {
    const [books, setBooks] = useState(booksData);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [newBookModal, setNewBookModal] = useState(false);


    //päivittää aina genre ja author listat kun kirjalista päivittyy (kirja poistetaan tai lisätään)
    useEffect(() => {
        const uniqueGenres = [...new Set(books.map((book) => book.category))];
        const uniqueAuthors = [...new Set(books.map((book) => book.author))];
        setGenres(uniqueGenres); 
        setAuthors(uniqueAuthors); 
      }, [books]);

    
    //päivittää kirjalistan sitä mukaan mitä valitaan filtereistä
    useEffect(() => {
        setBooks(
          booksData.filter((book) => {
            return (
              (!genreFilter || book.category === genreFilter) &&
              (!authorFilter || book.author === authorFilter)
            );
          })
        );
      }, [genreFilter, authorFilter]);;


      //handlers yksittäisen kirjan moduulille (pop up/modal)
      const handleDelete = (id) => {
        setBooks(books.filter((book) => book.id !== id));
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
            setBooks([...books, newBook]);
            setNewBookModal(false);
        }
      };

    return (
        <div className='library'>
            <Header></Header>
            <h1>My Library</h1>
            <div className='lib-content'>
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

                <div className='profile-div'>
                    <h2>Back to Profile</h2>
                    <button>Profile</button>
                </div>
            </div >

            <div className="books-div">
                <h2>My collection</h2>
            {books.map((book) => (
          <Book key={book.id} book={book} onClick={() => handleBookClick(book)} />
        ))}
        </div>
        <div className='add-book-div'>
            <h2>Add new book</h2>
            <button className="add-book-btn" onClick={handleAddBook}>Add Book</button>
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
                />
            )} 

        </div>
    );
  };

  export default Library;