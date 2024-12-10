import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';
import useField from './useField'; // Import the useField hook

export default function useSignUp(onLogin) {
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');
  const confirmPassword = useField('password');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[\S]{8,}$/;
    return passwordRegex.test(password);
  };

  const emailValid = validateEmail(email.value);
  const strongPassword = validatePassword(password.value);
  const passwordMatch = password.value === confirmPassword.value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!emailValid || !strongPassword || !passwordMatch) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const newUser = { username: username.value, email: email.value, password: password.value };
      const signupRes = await fetch(`${REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!signupRes.ok) {
        const errorData = await signupRes.json();
        throw new Error(errorData.message || 'Signup failed.');
      }

      // Automatically login the user
      const loginRes = await fetch(`${REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      if (!loginRes.ok) {
        const loginError = await loginRes.json();
        throw new Error(loginError.message || 'Login failed.');
      }

      const loginData = await loginRes.json();
      localStorage.setItem('userData', JSON.stringify(loginData));
      onLogin(true); // Handle login state
      navigate('/customize-profile');
      setSuccessMessage('User created and logged in successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return {
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
  };
}
