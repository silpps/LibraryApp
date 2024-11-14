import profilepic from './profilepic.jpg';
import './ProfileCard.css';

function ProfileCard () {
    const username = 'Username';
    const bookWormLevel = 5;
    const genre = 'Mystery';
    
    return (
        <div className="profile-card">
            <img src={profilepic} alt="profile" className="profile-pic"/>
            <h1>{username}</h1>
            <p>Bookworm Level: {bookWormLevel} </p>
            <p>Favorite Genre: {genre}</p>
            <p>Description: "This is a placeholder for description to see how it wraps around"</p>
            <button className="profilecard-button">Edit Profile</button>
        </div>
    )
}

export default ProfileCard