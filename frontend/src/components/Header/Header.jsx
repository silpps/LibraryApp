import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import bookpng from '../../assets/bookpng.webp';
import { AuthContext } from '../../context/AuthContext';
import { use } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const goToPage = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="header">
      <div className="logo" onClick={() => goToPage(isLoggedIn ? '/profile' : '/login')}>
        <img src={bookpng} alt="Logo" />
        <h1>Bookhive</h1>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <a onClick={() => goToPage('/about')}>About</a>
          </li>
          <li>
            <a onClick={() => goToPage('/help')}>Help</a>
          </li>
          {isLoggedIn ? (
            <li>
              <a onClick={handleLogout}>Log Out</a>
            </li>
          ) : (
            <>
              {location.pathname !== '/signup' && (
                <li>
                  <a onClick={() => goToPage('/signup')}>Sign Up</a>
                </li>
              )}
              {location.pathname === '/signup' && (
                <li>
                  <a onClick={() => goToPage('/login')}>Log In</a>
                </li>
              )}
            </>
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
              <a onClick={() => goToPage('/about')}>About</a>
            </li>
            <li>
              <a onClick={() => goToPage('/help')}>Help</a>
            </li>
            {isLoggedIn ? (
              <li>
                <a onClick={handleLogout}>Log Out</a>
              </li>
            ) : (
              <>
                {location.pathname !== '/signup' && (
                  <li>
                    <a onClick={() => goToPage('/signup')}>Sign Up</a>
                  </li>
                )}
                {location.pathname === '/signup' && (
                  <li>
                    <a onClick={() => goToPage('/login')}>Log In</a>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;