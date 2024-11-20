import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { Link } from 'react-router-dom';
import RecentBooks from "../Profile/RecentBooks";

const Profile= ({username, description}) => {
  const navigate = useNavigate();

  //these will be fixed when there's functioning wishlist and library
  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const goToLibrary = () => {
    navigate('/library');
  };

  const goToReadingList = () => {
    navigate('/readinglist');
  }
  
    return (
      <div className="profile-page">
        <ProfileCard username={username} description={description} />
        <Link to="/settings">
        <button className="editbutton">Edit Profile</button>
        </Link>
        <RecentBooks />
        <button className = "wishlist-button" onClick={goToWishlist}>Wishlist</button>
        <button className= "library-button" onClick={goToLibrary}>Library</button>
        <button className= "readinglist-button" onClick={goToReadingList}>Reading List</button>
      </div>
    );
  };

  export default Profile;