import React, { useState } from 'react';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
import { useNavigate } from 'react-router-dom';
import '../../pages/SignUpPage/SignUp.css';

const apiUrl = `${REACT_APP_API_URL}`;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState(''); // Error for password strength
  const navigate = useNavigate();

  // Validate password strength (must include lowercase, uppercase, numbers, special characters, and be at least 8 characters long)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[\S]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setPasswordStrengthError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Check if new password is strong
    if (!validatePassword(newPassword)) {
      setPasswordStrengthError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.');
      return;
    }

    // Get user data and token from localStorage
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      setError('User data not found. Please log in again.');
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    try {
      const res = await fetch(`${apiUrl}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage(data.message || 'Password changed successfully!');
        setTimeout(() => {
          navigate('/profile'); 
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to change password.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {passwordStrengthError && <p className="error-message">{passwordStrengthError}</p>} {/* Show strength error */}
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ChangePassword;
