import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import RecentBooks from '../../components/RecentBooks/RecentBooks';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
import BookDetails from '../../modals/BookDetails/BookDetails'; 

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
  const [selectedBook, setSelectedBook] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [recentBooks, setRecentBooks] = useState([]);
  const [update, setUpdate] = useState(true);
  
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
        setBookwormLevel(data.library.length);
        setProfilePicture(data.profilePicture || 'bh_pfp_1');
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setUpdate(false);
    fetchProfileData();
  }, [update]);

  const triggerBookUpdate = () => {
    setUpdate(true); 
  };

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

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleUpdate = () => {
    closeModal();
    triggerBookUpdate();
  };

  const handleDelete = () => {
    triggerBookUpdate();
    closeModal();
  };

  return (
    <div className="profile-page">
      <h1 className='page-title'>{username}'s profile</h1>
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
        <RecentBooks books={recentBooks} onBookClick={openBookDetails} onUpdate= {triggerBookUpdate} />
      </div>

      <div className="profile-buttons-div">
        <button onClick={goToLibrary} className="library-button">Library</button>
        <button onClick={goToWishlist} className="wishlist-button">Wishlist</button>
      </div>

      {isModalOpen && (
        <BookDetails
          book={selectedBook}
          onClose={closeModal} 
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Profile;