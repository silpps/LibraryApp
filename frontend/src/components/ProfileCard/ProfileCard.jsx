import React, { useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';  
import './ProfileCard.css';

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

function ProfileCard() {
  const { username, description, profilePicture } = useProfile();  

  useEffect(() => {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#FFEFE1';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, []);

  const profileImage = 
    profilePicture === 'bh_pfp_1' ? pfp1 : 
    profilePicture === 'bh_pfp_2' ? pfp2 : 
    pfp3;

  return (
    <div className="profile-card">
      <img src={profileImage} alt="profile" className="profile-pic"/>
      <h1>{username}</h1>
      <p className="user-info"><strong>Bookworm Level: </strong><span className="bookwormlevel">1</span></p>
      <p className="user-info"><strong>Description: </strong>{description}</p>
    </div>
  );
}

export default ProfileCard;
