import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import SignUp from './pages/SignUpPage/SignUp.jsx';
import LogIn from './pages/LogInPage/LogIn.jsx';
import Profile from './pages/ProfilePage/Profile.jsx';
import Header from './components/Header/Header';
import Library from './pages/LibraryPage/Library.jsx';
import Help from './pages/HelpPage/Help.jsx';
import About from './pages/AboutPage/About.jsx';
import Wishlist from './pages/WishlistPage/Wishlist.jsx';
import CustomizeProfile from './pages/CustomizeProfilePage/CustomizeProfile.jsx';
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
  );
}

export default App;
