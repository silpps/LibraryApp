import ProfileCard from "../ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import { Link } from 'react-router-dom';
import RecentBooks from "../RecentBooks/RecentBooks";
import { useState } from 'react';
import {useEffect} from 'react'
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;


const Profile= ({username, description, bookwormLevel, updateProfile}) => {

  useEffect(() => {
    const fetchInfo = async () => {
     
      try {
        //Retrives the data from userData in localStorage
        const userDataString = localStorage.getItem("userData")
        if (!userDataString){
          throw new Error("Data not found in localstorage (login again?)")
        }
        //Given data is converted to a JS object
        const userData = JSON.parse(userDataString)
        //Take the id and token from the request
        const token = userData.token
        //The token is attached to the authorization element of the request
        const res = await fetch(`${apiUrl}/profile`, {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
          },
          });
          const data = await res.json();
          console.log(data)
          updateProfile(data.username, data.description, data.bookwormLevel)


      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      
    };
    fetchInfo()

  }, []);



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
        <div className="profile-card-div">
          <ProfileCard username={username} description={description} bookwormLevel={bookwormLevel} />
          <Link to="/settings">
          <button className="editbutton">Edit Profile</button>
          </Link>
        </div>
        <div className="recently-added-div">
          <RecentBooks />
        </div>
            <div className="profile-buttons-div">
            <Link to="/settings" className="editbutton-desktop">
              <button>Edit Profile</button>
            </Link>
            <button className = "wishlist-button" onClick={goToWishlist}>Wishlist</button>
            <button className= "library-button" onClick={goToLibrary}>Library</button>
            <button className= "readinglist-button" onClick={goToReadingList}>Reading List</button>
            </div>
      </div>
    );
  };

  export default Profile;