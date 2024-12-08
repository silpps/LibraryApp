// src/context/ProfileContext.js
import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState('bh_pfp_1'); 
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('Enter your description here!');

  const updateProfile = (newUsername, newDescription, newProfilePicture) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setProfilePicture(newProfilePicture);
  };

  return (
    <ProfileContext.Provider value={{ profilePicture, username, description, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
