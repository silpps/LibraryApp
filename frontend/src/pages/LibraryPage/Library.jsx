import React, { useState, useEffect } from 'react';
import Book from '../../components/Book/Book';
import BookDetails from '../../modals/BookDetails/BookDetails';
import AddBookForm from '../../modals/AddBookForm/AddBookForm';
import './Library.css';
import { Link, useNavigate } from 'react-router-dom';

//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const Library = () => {
    const navigate = useNavigate();
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [update, setUpdate] = useState(true); //tein tällasen koska 
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [readingStatusFilter, setReadingStatusFilter] = useState("all")
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

    //hakee alussa kaikki kirjat
    useEffect(() => {
      const fetchBooks = async () => {
       
        try {
          //Retrives the data from userData in localStorage
          const userDataString = localStorage.getItem("userData")
          if (!userDataString){
            throw new Error("Data not found in localstorage (login again?)")
          }
          //Given data is converted to a JS object
          const userData = JSON.parse(userDataString)
          //Take the id and token from the request
          const id = {id:userData.id}
          const token = userData.token
          //The token is attached to the authorization element of the request
          const res = await fetch(`${apiUrl}/library/userLibrary`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(id)
            });
            const data = await res.json();
            console.log(data)
            setAllBooks(data.library);
            console.log(data.library.length)
            console.log(allBooks)

            const newBookwormLevel = {
              bookwormLevel: data.library.length
            }

            await fetch(`${apiUrl}/profile/settings`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newBookwormLevel),
          });

        } catch (error) {
          console.error('Error fetching books:', error);
        }

  
      };
      fetchBooks();
      setUpdate(false);

    }, [update]);


    //päivittää aina genre ja author listat kun kirjalista päivittyy (kirja poistetaan tai lisätään)
  
    useEffect(() => {
        const uniqueGenres = [...new Set(books.flatMap((book) => book.category))];
        const uniqueAuthors = [...new Set(books.map((book) => book.authors))];
        setGenres(uniqueGenres); 
        setAuthors(uniqueAuthors); 
      }, [books, allBooks]);

    
    //päivittää kirjalistan sitä mukaan mitä valitaan filtereistä
    useEffect(() => {
      setBooks(
        allBooks.filter((book) => {
          return (
            (!genreFilter ||book.category.includes(genreFilter)) &&
            (!authorFilter || book.authors === authorFilter) &&
            (readingStatusFilter === 'all' ||
              (readingStatusFilter === 'reading' && book.reading === true) ||
              (readingStatusFilter === 'notReading' && book.reading === false))
          );
        })
      );
    }, [allBooks, genreFilter, authorFilter, readingStatusFilter]);
  
    //handler for deleting a book
    const handleDelete = (id) => {
      const updatedBooks = allBooks.filter((book) => book.id !== id); 
      setAllBooks(updatedBooks); 
    };

    const handleUpdate = (updatedBook) => {
      const updatedBooks = allBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      );
      setAllBooks(updatedBooks);
    };
    
    // handlers for opening and closing the book details modal
      const handleBookClick = (book) => {
        setSelectedBook(book);
      };

      const closeSelectedBook = () => {
        setSelectedBook(null);
      };


      //handlers for add book modaal
      const handleAddBook = () => {
        setNewBookModal(true);
      };

    return (
        <div className='library'>
            <h1>My Library</h1>
            <div className='lib-content'>
                <div className="left-div">
                <div className="filters-div">
                    <h2>Filters</h2>
                    <div className='filter'>
                        <label htmlFor="genre"><strong>Genre:  </strong></label>
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
                        <label htmlFor="author"><strong>Author:  </strong></label>
                        <select id="author" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
                        <option value="">All Authors</option>
                        {authors.map((author) => (
                            <option key={author} value={author}>
                            {author}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="filter">
                        <label htmlFor="readingStatus"><strong>Reading Status:</strong></label>
                        <select
                          id="readingStatus"
                          value={readingStatusFilter}
                          onChange={(e) => setReadingStatusFilter(e.target.value)}
                        >
                          <option value="all">All</option>
                          <option value="reading">Currently Reading</option>
                          <option value="notReading">Not Reading</option>
                        </select>
                    </div>

                    
                    <button onClick={() => {
                        setGenreFilter(''); 
                        setAuthorFilter('');}
                        }>Reset Filters</button>
                </div>

                <div className='profile-div'>
                    <h2>Go to</h2>
                    <Link to="/profile">
                    <button>Profile</button>
                    </Link>
                    <Link to="/wishlist">
                    <button>Wishlist</button>
                    </Link>
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
                onAddBook={() => setUpdate(true)}
                closeModal={() => setNewBookModal(false)}
                />
          )} 

          </div>
        </div>
    );
  };

  export default Library;