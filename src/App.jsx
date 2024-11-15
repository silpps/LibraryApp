import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer/Footer'
import ProfileCard from './components/ProfileCard/ProfileCard'
import SignUp from './components/SignUpPage/SignUp'
import LogIn from './components/LogInPage/LogIn'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogIn = () => {
    setIsLoggedIn(true)
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogIn onLogin={handleLogIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={isLoggedIn ? <ProfileCard /> : <LogIn onLogin={handleLogIn} />} />
        </Routes>
        <Footer />
    </div>
    </Router>
  )
}

export default App
