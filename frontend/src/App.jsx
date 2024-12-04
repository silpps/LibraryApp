import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUpPage/SignUp';
import LogIn from './components/LogInPage/LogIn';
import Profile from './components/Profile/Profile.jsx';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import Library from './components/Library/Library';
import Help from './components/Help/Help';
import About from './components/About/About';
import Wishlist from './components/Wishlist/Wishlist';
import ReadingList from './components/ReadingList/ReadingList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('BookLover69');
  const [description, setDescription] = useState('I love reading books!');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false); 
    //Upon logout removes the userData from the localStorage
    localStorage.removeItem("userData")
  };

  const updateProfile = (newUsername, newDescription) => {
    setUsername(newUsername);
    setDescription(newDescription);
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
            <Profile username={username} description={description} />) : (
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
          <Route path="/readinglist" element={<ReadingList />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
