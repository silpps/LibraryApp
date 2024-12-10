import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomizeProfile.css';

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';
import { REACT_APP_API_URL } from '../../utils/apiConfig';

const CustomizeProfile = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('User data not found. Please log in again.');
        }

        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const res = await fetch(`${REACT_APP_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile data.');
        }

        const data = await res.json();
        setUsername(data.username);
        setDescription(data.description);
        setProfilePicture(data.profilePicture || 'bh_pfp_1');
        setNewDescription(data.description);
        setNewProfilePicture(data.profilePicture || 'bh_pfp_1');
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDataString = localStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const res = await fetch(`${REACT_APP_API_URL}/profile/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username, // Username is not editable here, so we keep the existing one
          description: newDescription,
          profilePicture: newProfilePicture,
        }),
      });
      console.log('Updated profile data: ', description, newDescription, profilePicture, newProfilePicture);
      if (!res.ok) {
        throw new Error('Failed to update profile.');
      }

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default CustomizeProfile;
