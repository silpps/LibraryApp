import './Settings.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Settings = ({username, description, onUpdate}) => {
    const [newUsername, setNewUsername] = useState(username);
    const [newDescription, setNewDescription] = useState(description);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(newUsername, newDescription);
        console.log('Settings Updated' + ' ' + newUsername + ' ' + newDescription);
        navigate ('/profile');
    }


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
                <button className="settings-button" type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default Settings