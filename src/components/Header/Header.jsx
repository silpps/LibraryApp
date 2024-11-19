import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoPlaceholder.jpg';

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

  const goToProfile = () => {
    navigate('/profile'); 
  }

  return (
    <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={goToProfile}/>
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
          <li>
            <a onClick={signOut}>Sign Out</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
