import React, { useEffect } from 'react';
import '../../pages/SignUpPage/SignUp.css';
import { Link } from 'react-router-dom';
import background from '../../assets/syksytausta.jpg';
import useLogIn from '../../hooks/useLogin';

const LogIn = ({ onLogin }) => {
  const {
    email,
    password,
    emailValid,
    passwordValid,
    showError,
    handleEmailChange,
    handlePasswordChange,
    handleLogIn,
  } = useLogIn(onLogin);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, []);

  return (
    <div className="container">
      <h1>Log In</h1>
      <form className="form" onSubmit={handleLogIn}>
        <p className="description">Email</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className={emailValid ? 'valid' : 'invalid'}
          required
        />
        <p className="description">Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className={passwordValid ? 'valid' : 'invalid'}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {showError && <p className="error-message">Invalid email or password</p>}
      <p className="sign-up-link">
        Don't have an account? <Link to="/signup">Sign Up here</Link>
      </p>
    </div>
  );
};

export default LogIn;
