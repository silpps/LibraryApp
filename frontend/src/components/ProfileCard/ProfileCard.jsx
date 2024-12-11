import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ username, description, bookwormLevel, profilePicture }) => {

  return (
    <div className="profile-card">
      <img src={profilePicture} alt="profile" className="profile-pic" />
      <h1>{username}</h1>
      <p className="user-info"><strong>Bookworm Level: </strong><span className="bookwormlevel">{bookwormLevel}</span></p>
      <p className="user-info"><strong>Description: </strong>{description}</p>
    </div>
  );
};

export default ProfileCard;
