import bh_pfp_3 from '../../assets/bh_pfp_3.jpg';
import './ProfileCard.css';
import { useEffect } from 'react';

function ProfileCard ({username, description, bookwormLevel}) {

    useEffect(() => {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = '#FFEFE1';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        
    }, []);

    
    return (
        <div className="profile-card">
            <img src={bh_pfp_3} alt="profile" className="profile-pic"/>
            <h1>{username}</h1>
            <p>
                Bookworm Level: <span className="bookwormlevel">&nbsp;{bookwormLevel}&nbsp;</span></p>
            <p>Description: {description}</p>
        </div>
    )
}

export default ProfileCard