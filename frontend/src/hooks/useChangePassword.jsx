// src/hooks/useChangePassword.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';

const apiUrl = `${REACT_APP_API_URL}`;

const useChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');
  const navigate = useNavigate();

  // Validate password strength
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

    if (!validatePassword(newPassword)) {
      setPasswordStrengthError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.');
      return;
    }

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

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    error,
    passwordStrengthError,
    handleSubmit,
  };
};

export default useChangePassword;
