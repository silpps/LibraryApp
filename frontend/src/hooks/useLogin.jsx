import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';

export default function useLogIn(onLogin) {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    const loginDetails = { email, password };

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
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setShowError(true);
    }
  };

  return {
    email,
    password,
    emailValid,
    passwordValid,
    showError,
    handleEmailChange,
    handlePasswordChange,
    handleLogIn,
  };
}
