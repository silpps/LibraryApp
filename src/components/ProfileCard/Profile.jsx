import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { Link } from 'react-router-dom';
import RecentBooks from "../Profile/RecentBooks";
import '../Profile/RecentBooks.css';

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
      <div>
        <h1 className="profile">Profile</h1>
        <ProfileCard username={username} description={description} />
        <Link to="/settings">
        <button className="editbutton">Edit Profile</button>
        </Link>
        <RecentBooks />
        <button className = "profilebutton" onClick={goToWishlist}>Wishlist</button>
        <button className= "profilebutton" onClick={goToLibrary}>Library</button>
        <button className= "profilebutton" onClick={goToReadingList}>Reading List</button>
      </div>
    );
  };

  export default Profile;