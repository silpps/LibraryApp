import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" />
        </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/help">Help</a>
          </li>
          <li>
            <a href="/signout">Sign Out</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;