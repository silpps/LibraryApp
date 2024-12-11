import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp'; // Corrected import path

const SignUp = () => {
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
    handleSubmit,
  } = useSignUp();

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <p className="description">Username</p>
        <input
          {...username}
          placeholder="Enter your username"
          required
        />

        <p className="description">Email</p>
        <input
          {...email}
          placeholder="Enter your email"
          className={emailValid ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !emailValid && (
          <p className="error-message">Please enter a valid email address</p>
        )}

        <p className="description">Password</p>
        <input
          {...password}
          placeholder="Enter your password"
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
          {...confirmPassword}
          placeholder="Re-enter your password"
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