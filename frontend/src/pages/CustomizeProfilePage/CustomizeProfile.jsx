import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
import './CustomizeProfile.css';
import bh_pfp_1 from '../../assets/bh_pfp_1.jpg';
import bh_pfp_2 from '../../assets/bh_pfp_2.jpg';
import bh_pfp_3 from '../../assets/bh_pfp_3.jpg';

const apiUrl = `${REACT_APP_API_URL}`;

const CustomizeProfile = ({ username, description, profilePicture, onUpdate }) => {
    const [newDescription, setNewDescription] = useState(description);
    const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = '#FFEFE1';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                throw new Error('Data not found in localStorage (login again?)');
            }
            const userData = JSON.parse(userDataString);
            const token = userData.token;

            const updatedInfo = {
                description: newDescription,
                profilePicture: newProfilePicture,
            };

            await fetch(`${apiUrl}/profile/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedInfo),
            });

            onUpdate(username, newDescription, userData.bookwormLevel, newProfilePicture);
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="customize-profile-container">
            <h1>Customize Profile</h1>
            <form onSubmit={handleSubmit}>
                <p className="description">Description</p>
                <textarea
                    placeholder="Enter your new description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <p className="description">Profile Picture</p>
                <div className="profile-pic-options">
                    <label>
                        <input
                            type="radio"
                            name="profilePicture"
                            value="bh_pfp_1"
                            checked={newProfilePicture === 'bh_pfp_1'}
                            onChange={() => setNewProfilePicture('bh_pfp_1')}
                        />
                        <img src={bh_pfp_1} alt="Profile 1" className="profile-pic-option" />
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="profilePicture"
                            value="bh_pfp_2"
                            checked={newProfilePicture === 'bh_pfp_2'}
                            onChange={() => setNewProfilePicture('bh_pfp_2')}
                        />
                        <img src={bh_pfp_2} alt="Profile 2" className="profile-pic-option" />
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="profilePicture"
                            value="bh_pfp_3"
                            checked={newProfilePicture === 'bh_pfp_3'}
                            onChange={() => setNewProfilePicture('bh_pfp_3')}
                        />
                        <img src={bh_pfp_3} alt="Profile 3" className="profile-pic-option" />
                    </label>
                </div>
                <button className="customize-button" type="submit">Save Changes</button>
                <button className="customize-button" type="button" onClick={() => navigate('/profile')}>Cancel</button>
            </form>
        </div>
    );
};

export default CustomizeProfile;