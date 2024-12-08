import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';  
import { useNavigate } from 'react-router-dom';  
import './CustomizeProfile.css';  

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

const CustomizeProfile = () => {
  const { profilePicture, username, description, updateProfile } = useProfile(); 
  const [newDescription, setNewDescription] = useState(description);
  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(username, newDescription, newProfilePicture);
    navigate('/profile');
  };

  return (
    <div className="customize-profile-container">
      <h1>Customize Profile</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your new description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <div className="profile-pic-options">
          <label>
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
      </form>
    </div>
  );
};

export default CustomizeProfile;
