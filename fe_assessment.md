# Frontend Self Assessment

Frontend focused on user-friendly application with dynamic UI. Following self assessment includes examples of the frontend code.

## Profile

Profile page is designed to display and manage a user's profile information. It integrates with backend APIs to fetch and update user data dynamically. 

```js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import RecentBooks from '../../components/RecentBooks/RecentBooks';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
import BookDetails from '../../modals/BookDetails/BookDetails'; 

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

const apiUrl = `${REACT_APP_API_URL}`;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [bookwormLevel, setBookwormLevel] = useState(1);
  const [profilePicture, setProfilePicture] = useState('bh_pfp_1');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [recentBooks, setRecentBooks] = useState([]);
  const [update, setUpdate] = useState(true);
  
  const navigate = useNavigate();

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('User data not found. Please log in again.');
        }

        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const res = await fetch(`${apiUrl}/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await res.json();

        setUsername(data.username);
        setDescription(data.description);
        setBookwormLevel(data.library.length);
        setProfilePicture(data.profilePicture || 'bh_pfp_1');
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setUpdate(false);
    fetchProfileData();
  }, [update]);

  const triggerBookUpdate = () => {
    setUpdate(true); 
  };

  // Profile picture selection logic
  const profileImage =
    profilePicture === 'bh_pfp_1' ? pfp1 :
    profilePicture === 'bh_pfp_2' ? pfp2 :
    pfp3;

  // Navigate to different sections
  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const goToLibrary = () => {
    navigate('/library');
  };

  const goToCustomizeProfile = () => {
    navigate('/settings');
  };

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleUpdate = () => {
    closeModal();
    triggerBookUpdate();
  };

  const handleDelete = () => {
    triggerBookUpdate();
    closeModal();
  };

  return (
    <div className="profile-page">
      <h1>{username}'s profile</h1>
      <div className="profile-card-div">
        <ProfileCard 
          username={username} 
          description={description} 
          bookwormLevel={bookwormLevel} 
          profilePicture={profileImage} 
        />
        <button onClick={goToCustomizeProfile}>
          Edit Profile
        </button>
      </div>

      <div className="recently-added-div">
        <RecentBooks books={recentBooks} onBookClick={openBookDetails} onUpdate= {triggerBookUpdate} />
      </div>

      <div className="profile-buttons-div">
        <button onClick={goToLibrary} className="library-button">Library</button>
        <button onClick={goToWishlist} className="wishlist-button">Wishlist</button>
      </div>

      {isModalOpen && (
        <BookDetails
          book={selectedBook}
          onClose={closeModal} 
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Profile;
```

### Positive Aspects 
1. **Component Modularity:**
   The Profile component is well-structured, with subcomponents such as ProfileCard, RecentBooks, and BookDetails handling     specific responsibilities. This promotes reusability and cleaner code.

2. **Dynamic Profile Picture Logic:**
   The profile picture selection logic is straightforward and allows for easy extension to support more images.

3. **Data Fetching:**
   Profile data is fetched on component mount, ensuring the UI is populated dynamically based on the user’s data.

4. **Navigation Integration:**
   Button handlers (goToWishlist, goToLibrary, goToCustomizeProfile) use useNavigate for clean and efficient navigation        between routes.

### Areas for Improvement
1. **State Management:**
   Multiple useState hooks are used for managing state. While this works, a state management solution like useReducer or a     global state library could simplify state logic and improve scalability.

2. **Hardcoded Assets:**
   The profile picture logic hardcodes assets (pfp1, pfp2, pfp3). Using a more dynamic approach (e.g., mapping through an      array of image data) would make it easier to maintain and extend.

3. **Redundant Calls:**
   The update state triggers re-fetching profile data. This approach works but could be optimized by directly updating the     relevant state after specific actions like updating or deleting a book.


## SignUp page and useSignup hook

Following code implements a sign-up functionality using a custom hook.

```js
import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignup';

const SignUp = ({ onLogin }) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    emailValid,
    strongPassword,
    passwordMatch,
    formSubmitted,
    successMessage,
    errorMessage,
    handleSubmit,
  } = useSignUp(onLogin);

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <p className="description">Username</p>
        <input
          {...username}
          placeholder="Enter your username"
          required
        />

        <p className="description">Email</p>
        <input
          {...email}
          placeholder="Enter your email"
          className={emailValid ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !emailValid && (
          <p className="error-message">Please enter a valid email address</p>
        )}

        <p className="description">Password</p>
        <input
          {...password}
          placeholder="Enter your password"
          className={strongPassword ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !strongPassword && (
          <p className="error-message">
            Password must be at least 8 characters long and contain at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </p>
        )}

        <p className="description">Confirm Password</p>
        <input
          {...confirmPassword}
          placeholder="Re-enter your password"
          className={passwordMatch ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !passwordMatch && (
          <p className="error-message">Passwords do not match</p>
        )}

        <button type="submit">Sign Up</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="sign-up-link">
        Ready to log in? <Link to="/">Log In here</Link>
      </p>
    </div>
  );
};

export default SignUp;
```
```js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';
import useField from './useField'; // Import the useField hook

export default function useSignUp(onLogin) {
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');
  const confirmPassword = useField('password');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[\S]{8,}$/;
    return passwordRegex.test(password);
  };

  const emailValid = validateEmail(email.value);
  const strongPassword = validatePassword(password.value);
  const passwordMatch = password.value === confirmPassword.value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!emailValid || !strongPassword || !passwordMatch) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const newUser = { username: username.value, email: email.value, password: password.value };
      const signupRes = await fetch(`${REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!signupRes.ok) {
        const errorData = await signupRes.json();
        throw new Error(errorData.message || 'Signup failed.');
      }

      // Automatically login the user
      const loginRes = await fetch(`${REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      if (!loginRes.ok) {
        const loginError = await loginRes.json();
        throw new Error(loginError.message || 'Login failed.');
      }

      const loginData = await loginRes.json();
      localStorage.setItem('userData', JSON.stringify(loginData));
      onLogin(true); // Handle login state
      navigate('/customize-profile');
      setSuccessMessage('User created and logged in successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    emailValid,
    strongPassword,
    passwordMatch,
    formSubmitted,
    successMessage,
    errorMessage,
    handleSubmit,
  };
}
```

### Positive Aspects

1. **Reusability:** The use of the custom hook separates sign-up logic from the UI. UseField enhances reusability.
2. **Success and error states:** Managing error and success messages effectively provide clear feedback to user.
3. **Code Organization:** Separating the UI logic in the component and business logic in the custom hook ensures better maintainability

### Areas for Improvement

1. **Reusability:** Reusability could be improved by moving validateEmail and validatePassword function to a utility file for reuse across components
2. **Optimization:** Instead of making two separate API calls (for sign-up and login separately), the backend could return a token directly upon successful registration.

## UseContext

There were multiple attempts to integrate useContext into the project. Unfortunately, this wasn't successful due to challenges in managing state consistency. The following code is a snippet of such an attempt, but it was removed from the final project.

```js
import React, { createContext, useState, useContext } from 'react';
const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);
export const ProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState('bh_pfp_1'); 
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('Enter your description here!');
  const updateProfile = (newUsername, newDescription, newProfilePicture) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setProfilePicture(newProfilePicture);
  };
  return (
    <ProfileContext.Provider value={{ profilePicture, username, description, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
```
```js
import About from './pages/AboutPage/About.jsx';
import Wishlist from './pages/WishlistPage/Wishlist.jsx';
import CustomizeProfile from './pages/CustomizeProfilePage/CustomizeProfile.jsx';

import { ProfileProvider } from './context/ProfileContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isFirstLogin, setIsFirstLogin] = useState(false);

const handleLogIn = (firstLogin = false) => {
    setIsLoggedIn(true);
    setIsFirstLogin(firstLogin);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setIsFirstLogin(false);
    localStorage.removeItem("userData");
    console.log("Logged out ");
  };

return (
 <ProfileProvider>
      <Router>
        <Header isLoggedIn={isLoggedIn} logOut={logOut} />
        <div>
          <Routes>
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/" element={<LogIn onLogin={handleLogIn} />} />
            <Route path="/signup" element={<SignUp onLogin={handleLogIn} />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <LogIn onLogin={handleLogIn} />} />
            <Route path="/settings" element={isLoggedIn ? <CustomizeProfile/> : <LogIn onLogin={handleLogIn} />} />
            <Route path="/customize-profile" element={isFirstLogin ? <CustomizeProfile /> : <LogIn onLogin={handleLogIn} />} />
            <Route path="/library" element={<Library />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LogIn onLogin={handleLogIn} />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ProfileProvider>
  );
}
export default App;
```
The main issue was that the user data, such as the profile picture, was applied globally across all users rather than being tied to a specific user. For instance, changes made to a profile picture would affect every user's profile, not just the currently logged-in user. Despite efforts to resolve this, the code was ultimately removed from the final project and replaced with useEffect and useState. This is definitely something to learn from and will guide future efforts to improve the understanding and proper implementation of useContext.




