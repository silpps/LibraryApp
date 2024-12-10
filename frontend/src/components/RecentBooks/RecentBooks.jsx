import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';
import '../../pages/ProfilePage/Profile.css';



// const recentBooks = booksData
//   .sort((a, b) => b.id - a.id) 
//    .slice(0, 3); 


const RecentBooks = ({ onBookClick }) => {
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
          const res = await fetch(`/api/library/userLibrary`, {
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
                <div key={book.id} onClick={() => onBookClick(book)}>
                  <Book book={book} />
                </div>
            ))}
        </div>
    );
  };


  export default RecentBooks;