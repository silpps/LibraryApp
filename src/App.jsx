import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer/Footer'
import ProfileCard from './components/ProfileCard/ProfileCard'
import SignUp from './components/SignUpPage/SignUp'
import LogIn from './components/LogInPage/LogIn'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <LogIn />
        <Footer />
    </div>
  )
}

export default App
