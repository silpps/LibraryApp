import booksData from '../../BookData.json';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const [books, setBooks] = useState(booksData);
  
const recentBooks = books
  .sort((a, b) => b.id - a.id) 
  .slice(0, 3); 


const RecentBooks = () => {
    return (
        <div className='recently-added-div'>
            <h2>Recently Added</h2>
            {recentBooks.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
    );
  };
