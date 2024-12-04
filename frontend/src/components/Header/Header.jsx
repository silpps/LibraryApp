import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoPlaceholder.jpg';

const Header = ({isLoggedIn, logOut }) => {
  const navigate = useNavigate();

  const goToHelp = () => {
    navigate('/help');  
  };

  const goToAbout = () => {
    navigate('/about'); 
  };

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
            <a onClick={logOut}>Log Out</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
