import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import RecentBooks from '../../components/RecentBooks/RecentBooks';
import { REACT_APP_API_URL } from '../../utils/apiConfig';

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

const apiUrl = `${REACT_APP_API_URL}`;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [bookwormLevel, setBookwormLevel] = useState(1);
  const [profilePicture, setProfilePicture] = useState('bh_pfp_1');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('User data not found. Please log in again.');
        }

        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const res = await fetch(`${apiUrl}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await res.json();

        setUsername(data.username);
        setDescription(data.description);
        setBookwormLevel(data.bookwormLevel);
        setProfilePicture(data.profilePicture || 'bh_pfp_1');
        console.log('Profile profilePicture state: ', profilePicture, " data.profilePicture", data.profilePicture, " data: ", data);

      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    console.log('Updated profilePicture state:', profilePicture);
  }, [profilePicture]);

  // Profile picture selection logic
  const profileImage =
    profilePicture === 'bh_pfp_1' ? pfp1 :
    profilePicture === 'bh_pfp_2' ? pfp2 :
    pfp3;

  // Navigate to different sections
  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const goToLibrary = () => {
    navigate('/library');
  };

  const goToCustomizeProfile = () => {
    navigate('/settings');
  };


  return (
    <div className="profile-page">
      <div className="profile-card-div">
        <ProfileCard 
          username={username} 
          description={description} 
          bookwormLevel={bookwormLevel} 
          profilePicture={profileImage} 
        />
        <button onClick={goToCustomizeProfile}>
          Edit Profile
        </button>
      </div>

      <div className="recently-added-div">
        <RecentBooks />
      </div>

      <div className="profile-buttons-div">
        <button onClick={goToLibrary}>Library</button>
        <button onClick={goToWishlist}>Wishlist</button>
      </div>
    </div>
  );
};

export default Profile;
