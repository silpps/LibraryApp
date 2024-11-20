import booksData from '../../BookData.json';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Book from '../Book/Book';
import '../Profile/Profile.css';

  
const recentBooks = booksData
  .sort((a, b) => b.id - a.id) 
  .slice(0, 3); 


const RecentBooks = () => {
    const [books, setBooks] = useState(booksData);
    return (
        <div>
            <h2>Recently Added</h2>
            {recentBooks.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
    );
  };


  export default RecentBooks;