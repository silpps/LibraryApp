import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';
import '../../pages/ProfilePage/Profile.css';

//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const RecentBooks = ({ onBookClick, onUpdate }) => {
    const [books, setBooks] = useState([]);

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
          const token = userData.token
          //The token is attached to the authorization element of the request
          const res = await fetch(`${apiUrl}/library/recentBooks`, {
            method: "GET",
            headers: {"Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
            }
            });
            const data = await res.json();
            setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
      fetchBooks();
    }, [onUpdate]);


    return (
        <div>
            <h2>Recently Added</h2>
            {books.length === 0 && <p>No books found</p>}
            {books.map((book) => (
                <div key={book.id} onClick={() => onBookClick(book)}>
                  <Book book={book} />
                </div>
            ))}
        </div>
    );
  };


  export default RecentBooks;