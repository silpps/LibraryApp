import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';
import useField from './useField'; // Assuming useField is in the same directory

export default function useLogIn(onLogin) {
  const email = useField('email');
  const password = useField('password');
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault(); // Prevent form submission
    const loginDetails = { email: email.value, password: password.value };

    try {
      const res = await fetch(`${REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails),
      });

      const userData = await res.json();
      if (res.ok) {
        localStorage.setItem('userData', JSON.stringify(userData));
        onLogin(); // Perform any additional login actions
        navigate('/profile');
        console.log('Logged in successfully');
      } else {
        setShowError(true); // Display error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setShowError(true); // Handle fetch/network errors
    }
  };

  return {
    email,
    password,
    showError,
    handleLogIn,
  };
}
