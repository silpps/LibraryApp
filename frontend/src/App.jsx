import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import SignUp from './pages/SignUpPage/SignUp.jsx';
import LogIn from './pages/LogInPage/LogIn.jsx';
import Profile from './pages/ProfilePage/Profile.jsx';
import Settings from './pages/SettingsPage/Settings.jsx';
import Header from './components/Header/Header';
import Library from './pages/LibraryPage/Library.jsx';
import Help from './pages/HelpPage/Help.jsx';
import About from './pages/AboutPage/About.jsx';
import Wishlist from './pages/WishlistPage/Wishlist.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('BookLover69');
  const [description, setDescription] = useState('I love reading books!');
  const [bookwormLevel, setBookwormLevel] = useState("0")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogIn =  () => {
    setIsLoggedIn(true);
  };


  const logOut = () => {
    setIsLoggedIn(false); 
    //Upon logout removes the userData from the localStorage
    localStorage.removeItem("userData")
  };

  const updateProfile = (newUsername, newDescription, newBookwormLevel) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setBookwormLevel(newBookwormLevel)
  };


  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} logOut={logOut} />
      <div>
        <Routes>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/" element={<LogIn onLogin={handleLogIn} />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={isLoggedIn ? (
            <Profile username={username} description={description} bookwormLevel={bookwormLevel} updateProfile = {updateProfile} />) : (
          <LogIn onLogin={handleLogIn} />)}
          />
          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <Settings
                  username={username}
                  description={description}
                  onUpdate={updateProfile}
                />
              ) : (
                <LogIn onLogin={handleLogIn} />
              )
            }
          />
          <Route path="/library" element={<Library />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path= "/login" element={<LogIn/>} />
          <Route path="/wishlist" element={<Wishlist />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
