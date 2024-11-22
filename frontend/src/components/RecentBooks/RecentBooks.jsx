import booksData from '../../BookData.json';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Book from '../Book/Book';
import '../Profile/Profile.css';

//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}/bookhive/library/recent`;


// const recentBooks = booksData
//   .sort((a, b) => b.id - a.id) 
//    .slice(0, 3); 


const RecentBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            console.log(data);
            setBooks(data);
          } catch (error) {
            console.error('Error fetching books:', error);
          }
        };
    
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Recently Added</h2>
            {books.length === 0 && <p>No books found</p>}
            {books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
    );
  };


  export default RecentBooks;