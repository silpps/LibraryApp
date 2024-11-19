import profilepic from './profilepic.jpg';
import './ProfileCard.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProfileCard ({username, description}) {
    const bookWormLevel = 5;
    const genre = 'Mystery';

    useEffect(() => {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = '#FFEFE1';  // Example color
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        
    }, []);

    
    return (
        <div className="profile-card">
            <img src={profilepic} alt="profile" className="profile-pic"/>
            <h1>{username}</h1>
            <p>Bookworm Level: {bookWormLevel} </p>
            <p>Favorite Genre: {genre}</p>
            <p>Description: {description}</p>
        </div>
    )
}

export default ProfileCard