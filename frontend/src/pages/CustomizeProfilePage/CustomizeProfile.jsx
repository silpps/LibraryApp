import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';  
import { useNavigate, useLocation } from 'react-router-dom';  
import './CustomizeProfile.css';  

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

const CustomizeProfile = () => {
  const location = useLocation();
  const { profilePicture, username, description, updateProfile } = useProfile(); 
  const [newDescription, setNewDescription] = useState(description);
  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(username, newDescription, newProfilePicture);
    navigate('/profile');
  };

  const cancelHandler = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/profile');
    }
  };

  return (
    <div className="customize-profile-container">
      {location.pathname === '/settings' && <h1>Edit Profile</h1>}
      {location.pathname === '/customize-profile' && (
        <>
        <h1>Customize Profile</h1>
        <p>Thank you for signing up to BookHive! </p>
        <p>Let's get started by customizing your profile.</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <label>Description: </label>
        {location.pathname === '/settings' && (
          <textarea
          placeholder={description}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        )}
        {location.pathname === '/customize-profile' && (
          <textarea
          placeholder={`Tell us about yourself, ${username}!`}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        )}
        <div className="profile-pic-options">
          <label>
            Profile picture:
            <input
              type="radio"
              name="profilePicture"
              value="bh_pfp_1"
              checked={newProfilePicture === 'bh_pfp_1'}
              onChange={() => setNewProfilePicture('bh_pfp_1')}
            />
            <img src={pfp1} alt="Profile 1" className="profile-pic-option"/>
          </label>
          <label>
            <input
              type="radio"
              name="profilePicture"
              value="bh_pfp_2"
              checked={newProfilePicture === 'bh_pfp_2'}
              onChange={() => setNewProfilePicture('bh_pfp_2')}
            />
            <img src={pfp2} alt="Profile 2" className="profile-pic-option"/>
          </label>
          <label>
            <input
              type="radio"
              name="profilePicture"
              value="bh_pfp_3"
              checked={newProfilePicture === 'bh_pfp_3'}
              onChange={() => setNewProfilePicture('bh_pfp_3')}
            />
            <img src={pfp3} alt="Profile 3" className="profile-pic-option"/>
          </label>
        </div>
        <button type="submit">Save Changes</button>
        {location.pathname === '/settings' && (
          <button onClick={cancelHandler}>Cancel</button>
        )}
      </form>
    </div>
  );
};

export default CustomizeProfile;
