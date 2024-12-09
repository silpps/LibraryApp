import React from "react";
import "./Help.css"
import { Link } from "react-router-dom";

const Help = ({ isLoggedIn }) => {
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
        <Link to="/profile">Profile</Link>
      ) : (
        <Link to="/login">Log in</Link>
      )}

      </div>
    );
  };
  
  export default Help;