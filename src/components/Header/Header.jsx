import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToHelp = () => {
    navigate('/help');
  };

  const goToAbout = () => {
    navigate('/about');
  };

  const signOut = () => {
    navigate('/login');
  }

  return (
    <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" />
        </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <a href="/about" onClick={goToAbout}>About</a>
          </li>
          <li>
            <a href="/help" onClick={goToHelp}>Help</a>
          </li>
          <li>
            <a href="/signout" onClick={signOut}>Sign Out</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;