import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomizeProfile.css';

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';
import { REACT_APP_API_URL } from '../../utils/apiConfig';

const CustomizeProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State Variables
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');

  // Fetch Initial Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) throw new Error('User data not found. Please log in again.');

        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const res = await fetch(`${REACT_APP_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile data.');

        const data = await res.json();
        setUsername(data.username);
        setDescription(data.description);
        setProfilePicture(data.profilePicture || 'bh_pfp_1');
        setNewDescription(data.description);
        setNewProfilePicture(data.profilePicture || 'bh_pfp_1');
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    console.log('Updated profilePicture state:', profilePicture);
  }, [profilePicture]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) throw new Error('User data not found. Please log in again.');

      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const res = await fetch(`${REACT_APP_API_URL}/profile/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username, // Username is not editable here
          description: newDescription,
          profilePicture: newProfilePicture,
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile.');

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an issue saving your profile. Please try again.');
    }
  };

  // Handle Cancel
  const cancelHandler = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/profile');
    }
  };

  return (
    <div className="customize-profile-wrapper">
      <div className="customize-profile-container">
        {location.pathname === '/settings' && <h1>Edit Profile</h1>}
        {location.pathname === '/customize-profile' && (
          <>
            <h1>Customize Profile</h1>
            <p className="info-text">Thank you for signing up to BookHive!</p>
            <p className="info-text">Let's get started by customizing your profile.</p>
          </>
        )}
        <form onSubmit={handleSubmit}>
          {location.pathname === '/settings' && (
            <>
              <h3>Description: </h3>
              <textarea
                placeholder={description}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                maxLength="60"
                rows="2"
              />
              <p className="characters-text">{60 - newDescription.length} characters remaining</p>
              <h3>Profile picture: </h3>
            </>
          )}
          {location.pathname === '/customize-profile' && (
            <>
              <h3>Write a description: </h3>
              <textarea
                placeholder={`Tell us about yourself, ${username}!`}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                maxLength="60"
                rows="2"
              />
              <p className="characters-text">{60 - newDescription.length} characters remaining</p>
              <h3>Choose a profile picture:</h3>
            </>
          )}
          <div className="profile-pic-options">
            <label>
              <input
                type="radio"
                name="profilePicture"
                value="bh_pfp_1"
                checked={newProfilePicture === 'bh_pfp_1'}
                onChange={() => setNewProfilePicture('bh_pfp_1')}
              />
              <img src={pfp1} alt="Profile 1" className="profile-pic-option" />
            </label>
            <label>
              <input
                type="radio"
                name="profilePicture"
                value="bh_pfp_2"
                checked={newProfilePicture === 'bh_pfp_2'}
                onChange={() => setNewProfilePicture('bh_pfp_2')}
              />
              <img src={pfp2} alt="Profile 2" className="profile-pic-option" />
            </label>
            <label>
              <input
                type="radio"
                name="profilePicture"
                value="bh_pfp_3"
                checked={newProfilePicture === 'bh_pfp_3'}
                onChange={() => setNewProfilePicture('bh_pfp_3')}
              />
              <img src={pfp3} alt="Profile 3" className="profile-pic-option" />
            </label>
          </div>
          <div className="button-container">
            <button type="submit">Save</button>
            <button type="button" onClick={cancelHandler}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeProfile;
