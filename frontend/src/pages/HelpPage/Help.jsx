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
  
        <h2>How do I create an account?</h2>
        <p>
        To create an account, simply click on the "Sign Up" button on the homepage. You will need to provide your email address and create a password. Once you submit the form, you will be registered and can start using the platform.
        </p>

        <h2>How do I update my profile?</h2>
        <p>
        To update your profile, click the logo in the top left corner to go to the "Profile" section. Once there, you'll see an 'Edit Profile' button, where you can update your description and profile picture.
        </p>

        <h2>What is Bookworm Level?</h2>
        <p>
        Bookworm Level is a way to track your progress as you read more books. The more books you add to your library and wishlist, the higher your Bookworm Level will go. It's a fun way to see how engaged you are with the platform!
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