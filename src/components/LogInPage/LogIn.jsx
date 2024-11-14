import React, { useState } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';


const LogIn = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [userValid, setUserValid] = useState(false);


    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    }


    const handlePasswordChange = (e) => {
      const inputPassword = e.target.value;
        setPassword(inputPassword);
    }


    const handleLogIn = (e) => {
        e.preventDefault();
        if(emailValid && passwordValid) {
            console.log('Log In Successful' + ' ' + username + ' ' + email + ' ' + password);
            setUserValid(true);
        } else {
            console.log('Log In Failed');
        }
    }


    return (
        <div className="login-container">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleLogIn}>
                <p className="description">Email</p>
                <input 
                type="Email"
                placeholder="Enter your email"
                value={email}
                onChange ={handleEmailChange} 
                className={emailValid ? 'valid' : 'invalid'} 
                required/>
                {!emailValid && <p className="error-message">Please enter a valid email address</p>} 
                {emailValid && <p className="success-message">Email address is valid</p>}
                <p className="description">Password</p>
                <input
                 type="password" 
                 placeholder="Enter your password"
                 value= {password}
                 onChange = {handlePasswordChange} 
                 required />
                <button type="submit">Log In</button>
                <p className="sign-up-link">
                    Not a member? Sign Up here
                </p>
            </form>
        </div>
    );
}

export default LogIn;

