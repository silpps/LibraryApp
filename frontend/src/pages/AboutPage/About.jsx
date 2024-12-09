import React from 'react';
import './About.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const About = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const moveToProfile = () => {
    navigate('/profile');
  }

  const moveToLogin = () => {
    navigate('/login');
  }

  const moveToHelp = () => {
    navigate('/help');
  }

  return (
    <div className="about-container">
      <h1>About BookHive</h1>
      <p>
        Welcome to BookHive, a  book collection web app! This application allows users to 
        manage their personal book collections, wishlist, and reading list. Whether 
        you're an avid reader or just starting your literary journey, our app is designed 
        to keep your book journey organized and enjoyable.
      </p>

      <h2>Meet the Team</h2>
      <ul className="team-list">
        <li><strong>Hilda</strong> - Frontend Developer</li>
        <li><strong>Karoliina</strong> - Frontend Developer</li>
        <li><strong>Lasse</strong> - Backend Developer</li>
        <li><strong>Veera</strong> - Backend Developer</li>
      </ul>

      <p>
        This project is part of our school assignment, where we combine our skills 
        to create a functional, user-friendly web application. We hope you enjoy 
        using our app as much as we enjoyed building it!
      </p>

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