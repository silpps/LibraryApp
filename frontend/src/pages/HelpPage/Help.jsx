import React from "react";
import "./Help.css"
import { useNavigate } from 'react-router-dom';

const Help = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const moveToProfile = () => {
        navigate('/profile');
    }

    const moveToLogin = () => {
        navigate('/login');
    }

    return (
      <div className="help-div">
        <h1>Help</h1>
        <p>
          Below you can find frequently asked questions, as well as answers to them.
        </p>
  
        <h2>title</h2>
        <p>
          Help text
        </p>

        <h2>title</h2>
        <p>
          Help text
        </p>

        <h2>title</h2>
        <p>
          Help text
        </p>

        {isLoggedIn ? (
          <button onClick={moveToProfile}>Profile</button>
      ) : (
        <button onClick={moveToLogin}>Log in</button>
      )}

      </div>
    );
  };
  
  export default Help;