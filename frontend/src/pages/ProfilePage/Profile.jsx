import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const navigate = useNavigate();

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('Data not found in localStorage (login again?)');
        }

        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const res = await fetch(`${apiUrl}/users/profile`, {
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
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchInfo();
  });

  const profileImage =
    profilePicture === 'bh_pfp_1' ? pfp1 :
    profilePicture === 'bh_pfp_2' ? pfp2 :
    pfp3;

  // Navigate to wishlist or library
  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const goToLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="profile-page">
      <div className="profile-card-div">
        <ProfileCard username={username} description={description} bookwormLevel={bookwormLevel} />
        <Link to="/settings">
          <button className="editbutton">Edit Profile</button>
        </Link>
      </div>

      <div className="recently-added-div">
        <RecentBooks />
      </div>

      <div className="profile-buttons-div">
        <Link to="/settings" className="editbutton-desktop">
          <button>Edit Profile</button>
        </Link>
        <Link to="/library">
          <button className="library-button">Library</button>
        </Link>
        <Link to="/wishlist">
          <button className="wishlist-button">Wishlist</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
