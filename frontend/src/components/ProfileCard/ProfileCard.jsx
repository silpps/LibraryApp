import React from 'react';
import './ProfileCard.css';

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

const ProfileCard = ({ username, description, bookwormLevel, profilePicture }) => {

    console.log('ProfileCard props: ', { username, description, bookwormLevel, profilePicture });
    console.log('ProfileCard received profilePicture:', profilePicture);


  return (
    <div className="profile-card">
      <img src={profilePicture} alt="profile" className="profile-pic" />
      <h1>{username}</h1>
      <p>Bookworm Level: <span className="bookwormlevel">{bookwormLevel}</span></p>
      <p>Description: {description}</p>
    </div>
  );
};

export default ProfileCard;
