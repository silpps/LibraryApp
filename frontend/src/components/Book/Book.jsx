import React from 'react';
import './Book.css';

const Book = ({book, onClick}) => {

    const maxReviewLength = 20;

    {/*lyhentää pitkät kommentit et mahtuu tohon...*/}
    const trimReview = (review, maxLength) => {
        if (review && review.length > maxLength) {
          return review.slice(0, maxLength) + '...';
        }
        return review; 
      };

    {/*tähtien väritys*/}
    const colourStars = (rating) => {
        if (rating === undefined || rating === null) {
          return <p style={{ color: '#777' }}>No rating yet</p>;
        }
    
        const stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(
            <span key={i} style={{ color: i < rating ? '#FFD700' : '#ccc' }}>
              ★
            </span>
          );
        }
        return stars;
      };


    return (
        <div onClick={onClick} className="single-book">
            <div className="title-row">
            <div className='title'>
                <h3>{book.title}</h3>
                <p>by {book.authors}</p>
            </div>
                {book.reading && <strong className='reading'>READING</strong>}
            </div>
            <div className='info'>
                <p>{trimReview(book.review, maxReviewLength)}</p>
                <div className='stars'>{colourStars(book.rating)}</div>
            </div>
          </div>
      );
    };

    export default Book;