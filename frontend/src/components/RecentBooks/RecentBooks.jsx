import booksData from '../../BookData.json';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Book from '../Book/Book';
import '../Profile/Profile.css';

//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;


// const recentBooks = booksData
//   .sort((a, b) => b.id - a.id) 
//    .slice(0, 3); 


const RecentBooks = () => {
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
            const recentBooks = data.library
           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
           .slice(0, 3); 
            setBooks(recentBooks);
            console.log(recentBooks)
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