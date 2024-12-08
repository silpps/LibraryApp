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
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useSignUp(onLogin);

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
          required
        />

        <p className="description">Email</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className={emailValid ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !emailValid && (
          <p className="error-message">Please enter a valid email address</p>
        )}

        <p className="description">Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
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
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
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
