import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useField from './useField'; // Assuming useField is in the same directory

export default function useLogIn(onLogin) {
  const email = useField('email');
  const password = useField('password');
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault(); 
    const loginDetails = { email: email.value, password: password.value };

    try {
      const res = await fetch(`api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails),
      });
      const userData = await res.json();
      if (res.ok) {
        localStorage.setItem('userData', JSON.stringify(userData));
        onLogin(); 
        navigate('/profile');
        console.log('Logged in successfully ' + loginDetails.email);
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
    showError,
    handleLogIn,
  };
}
