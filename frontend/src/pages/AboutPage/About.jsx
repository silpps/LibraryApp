import React from 'react';
import './About.css';

const About = ({ isLoggedIn, moveToHelp, moveToProfile, moveToLogin }) => {
  return (
    <div className="about-container">
      <h2>About BookHive</h2>
      <p>
        Welcome to BookHive, a book collection web app! This application allows users to 
        manage their personal book collections, wishlist, and reading list. Whether 
        you're an avid reader or just starting your literary journey, our app is designed 
        to keep your book journey organized and enjoyable.
      </p>
      <p>
        This project is part of our school assignment, where we combine our skills 
        to create a functional, user-friendly web application. We hope you enjoy 
        using our app as much as we enjoyed building it!
      </p>

      <h2>Meet the Team</h2>
      <ul className="team-list">
        <li><strong>Hilda and Karoliina</strong> - Frontend Development</li>
        <li><strong>Lasse and Veera</strong> - Backend Development</li>
      </ul>
      <button onClick={moveToHelp}>Need help?</button>
      {isLoggedIn ? (
        <button onClick={moveToProfile}>Go to Profile</button>
      ) : (
        <button onClick={moveToLogin}>Log in</button>
      )}
    </div>
  );
};

export default About;