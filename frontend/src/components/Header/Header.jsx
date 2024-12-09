import React from 'react';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import bookpng from '../../assets/bookpng.webp';

const Header = ({isLoggedIn, logOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHelp = () => {
    navigate('/help');  
  };

  const goToAbout = () => {
    navigate('/about'); 
  };

  const goToProfile = () => {
    navigate('/profile'); 
  }

  const goToSignUp = () => {
    navigate('/signup');
  }

  const goToLogIn = () => {
    navigate('/');
  };

  return (
    <header className="header">
        <div className="logo">
          <img src={bookpng} alt="Logo" onClick={goToProfile}/>
        </div>
      <h1>Bookhive</h1>
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
      </nav>
    </header>
  );
};

export default Header;
