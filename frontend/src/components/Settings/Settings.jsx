import './Settings.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const Settings = ({ username, description, onUpdate }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const navigate = useNavigate();

    const updateProfile = async () => {
        try {
            // Retrieve the data from userData in localStorage
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                throw new Error('Data not found in localStorage (login again?)');
            }

            // Parse the userData string
            const userData = JSON.parse(userDataString);
            const token = userData.token;

            const newInfo = {
                username: newUsername,
                description: newDescription,
            };

            // The token is attached to the authorization header of the request
            await fetch(`${apiUrl}/profile/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newInfo),
            });

            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(newUsername, newDescription);
        console.log('Settings Updated:', newUsername, newDescription);

        // Call the function to update the profile
        updateProfile();

        // Navigate back to the profile page
        navigate('/profile');
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <p className="description">Username</p>
                <input
                    type="text"
                    placeholder="Enter your new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <p className="description">Description</p>
                <textarea
                    placeholder="Enter your new description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <button className="settings-button" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Settings;
