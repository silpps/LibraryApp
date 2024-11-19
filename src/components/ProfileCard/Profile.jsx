import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile= ({username, description}) => {
  const navigate = useNavigate();

  //these will be fixed when there's functioning wishlist and library
  const goToWishlist = () => {
    navigate('/');
  };

  const goToLibrary = () => {
    navigate('/');
  };
  
    return (
      <div>
        <ProfileCard username={username} description={description} />
        <Link to="/settings">
        <button className="editbutton">Edit Profile</button>
        </Link>
        <button className = "profilebutton" onClick={goToWishlist}>Wishlist</button>
        <button className= "profilebutton" onClick={goToLibrary}>Library</button>
      </div>
    );
  };

  export default Profile;