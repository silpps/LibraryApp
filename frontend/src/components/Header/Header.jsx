import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import bookpng from '../../assets/bookpng.webp';

const Header = ({ isLoggedIn, logOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

    const goToHelp = () => {
      navigate('/help');  
    };
  
    const goToAbout = () => {
      navigate('/about'); 
    };
  
    const goToProfileOrLogIn = () => {
      if (isLoggedIn) {
      navigate('/profile'); 
      }
      else {
        navigate('/');
      }
    }
  
    const goToSignUp = () => {
      navigate('/signup');
    }
  
    const goToLogIn = () => {
      navigate('/');
    };

  return (
    <header className="header">
      <div className="logo" onClick={goToProfileOrLogIn}>
        <img src={bookpng} alt="Logo" />
        <h1>Bookhive</h1>
      </div>
      <nav className="header-nav">
      <ul className="nav-links">
          <li>
            <a onClick={goToAbout}>About</a> 
          </li>
          <li>
            <a onClick={goToHelp}>Help</a>
          </li>
          {isLoggedIn && (
            <li>
              <a onClick={ () => {logOut(); navigate('/login');}}>Log Out</a>
            </li>
          )}
          {!isLoggedIn && location.pathname !== '/signup' && (
            <li>
              <a onClick={goToSignUp}>Sign Up</a>
            </li>
          )}
          {!isLoggedIn && location.pathname === '/signup' && (
            <li>
              <a onClick={goToLogIn}>Log In</a>
            </li>
          )}
        </ul>
      </nav>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        ☰
      </button>
      {isDropdownOpen && (
        <div className="dropdown-modal">
          <ul className="nav-links">
          <li>
            <a onClick={goToAbout}>About</a> 
          </li>
          <li>
            <a onClick={goToHelp}>Help</a>
          </li>
          {isLoggedIn && (
            <li>
              <a onClick={logOut}>Log Out</a>
            </li>
          )}
          {!isLoggedIn && location.pathname !== '/signup' && (
            <li>
              <a onClick={goToSignUp}>Sign Up</a>
            </li>
          )}
          {!isLoggedIn && location.pathname === '/signup' && (
            <li>
              <a onClick={goToLogIn}>Log In</a>
            </li>
          )}
        </ul>
        </div>
      )}
    </header>
  );
};

export default Header;