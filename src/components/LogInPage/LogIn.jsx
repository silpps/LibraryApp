import React, { useState } from 'react';
import '../SignUpPage/SignUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import background from '../../assets/syksytausta.jpg';

const LogIn = ({ onLogin }) => {
    /* Only using mockdata before combining frontend and backend */
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState('');
    const mockEmail = 'testi@testi.com'
    const mockPassword = 'testi123'
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    //UseEffect for background image
    /* Implementing useEffect in the project took some time, but I'm happy I got this done */
    useEffect(() => {
        document.body.style.backgroundImage = `url(${background})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        
    }, []);

    //Handlers for input fields
    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        if(inputEmail===mockEmail) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
    }
}

    const handlePasswordChange = (e) => {
      const inputPassword = e.target.value;
        setPassword(inputPassword);
      if (inputPassword === mockPassword) {
          setPasswordValid(true);
        } else {
            setPasswordValid(false);
    }
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        if(emailValid && passwordValid) {
            onLogin();
            navigate('/profile');
            console.log('Log In Successful' + ' ' + email + ' ' + password);
        } else {
            console.log('Log In Failed');
            setShowError(true);
        }
    }

    /* This was educational and I learned a lot. In general I think I need to improve error handling. Also implementing more conditional rendering */
    //Form for logging in
    return (
        <div className="container">
            <h1>Log In</h1>
            <form className="form" onSubmit={handleLogIn}>
                <p className="description">Email</p>
                <input 
                type="Email"
                placeholder="Enter your email"
                value={email}
                onChange ={handleEmailChange} 
                className={emailValid ? 'valid' : 'invalid'} 
                required/>
                <p className="description">Password</p>
                <input
                 type="password" 
                 placeholder="Enter your password"
                 value= {password}
                 onChange = {handlePasswordChange} 
                className={passwordValid ? 'valid' : 'invalid'}
                 required />
                 {showError && <p className="error-message">Invalid email or password</p>}
                <button type="submit" className="signin-button">Log In</button>
                <p className="sign-up-link">
                    Not a member? <Link to="/signup">Sign Up here</Link>
                </p>
            </form>
        </div>
    );
}

export default LogIn;

