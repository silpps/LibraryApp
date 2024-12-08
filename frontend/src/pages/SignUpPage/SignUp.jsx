import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../utils/apiConfig';

const SignUp = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [strongPassword, setStrongPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const inputUsername = e.target.value;
        setUsername(inputUsername);
    }

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailRegex.test(inputEmail));
    }

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
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
        const createUser = async () => {
            try {
                const newUser = {
                    username: username,
                    email: email,
                    password: password,
                };
                console.log('New User:', newUser);

                const res = await fetch(`${REACT_APP_API_URL}/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser)
                });
                const userData = await res.json();
                console.log(userData);

                if (res.ok) {
                    // Automatically log in the user after successful signup
                    const loginDetails = {
                        email: email,
                        password: password
                    };

                    const loginRes = await fetch(`${REACT_APP_API_URL}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginDetails)
                    });
                    const loginData = await loginRes.json();
                    console.log(loginData);

                    if (loginRes.ok) {
                        localStorage.setItem("userData", JSON.stringify(loginData));
                        onLogin(true); // Set isFirstLogin to true
                        navigate('/customize-profile');
                        console.log('Sign up and Log in Successful' + ' ' + email + ' ' + password);
                    } else {
                        console.log('Log in Failed');
                    }
                } else {
                    console.log('Sign up Failed');
                }

            } catch (error) {
                console.error('Error signing up:', error);
            }
        };
        createUser();

        setTimeout(() => {
            setSuccessMessage('User created successfully!');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form className="form" onSubmit={handleSubmit}>
                <p className="description">Username</p>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                    required />
                <p className="description">Email</p>
                <input
                    type="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={emailValid ? 'valid' : 'invalid'}
                    required />
                {!emailValid && <p className="error-message">Please enter a valid email address</p>}
                {emailValid && <p className="success-message">Email address is valid</p>}
                <p className="description">Password</p>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={strongPassword ? 'valid' : 'invalid'}
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
                    required />
                {!passwordMatch && <p className="error-message">Passwords do not match</p>}
                {passwordMatch && <p className="success-message">Passwords match</p>}
                <button type="submit">Sign Up</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <p className="sign-up-link">
                Ready to log in? <Link to="/">Log In here</Link>
            </p>
        </div>
    );
}

export default SignUp;