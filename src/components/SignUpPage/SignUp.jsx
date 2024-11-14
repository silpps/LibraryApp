import React, { useState } from 'react';
import './SignUp.css';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [strongPassword, setStrongPassword] = useState(false);

    const handleUsernameChange = (e) => {
        const inputUsername = e.target.value;
        setUsername(inputUsername);
    }

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        console.log(emailValid);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(inputEmail));
    }


    const handlePasswordChange = (e) => {
      const inputPassword = e.target.value;
        setPassword(inputPassword);
        console.log(strongPassword);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[\S]{8,}$/;
        setStrongPassword(passwordRegex.test(inputPassword));   
    }

    const handlePasswordValidation = (e) => {
        const inputConfirmPassword = e.target.value;
        setConfirmPassword(inputConfirmPassword);
        setPasswordMatch(password === inputConfirmPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(emailValid && strongPassword) {
            console.log('Sign Up Successful' + ' ' + username + ' ' + email + ' ' + password);
        } else {
            console.log('Sign Up Failed');
        }
    }


    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <p className="description">Username</p>
                <input
                 type="text"
                 placeholder="Enter your username"
                 value = {username}
                 onChange = {handleUsernameChange}
                 //className = {usernameValid ? 'valid' : 'invalid'} 
                 required/>
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
                 className = {strongPassword ? 'valid' : 'invalid'} 
                 required />
                 {!strongPassword && <p className="error-message">Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character</p>}
                 {strongPassword && <p className="success-message">Password is strong</p>}
                <p className="description">Confirm Password</p>
                <input
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={handlePasswordValidation}
                    className={passwordMatch ? 'valid' : 'invalid'} 
                    required/>
                    {!passwordMatch && <p className="error-message">Passwords do not match</p>}
                    {passwordMatch && <p className="success-message">Passwords match</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;

