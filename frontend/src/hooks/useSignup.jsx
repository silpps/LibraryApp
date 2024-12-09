import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';

export default function useSignUp(onLogin) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
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

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setEmailValid(validateEmail(inputEmail));
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setStrongPassword(validatePassword(inputPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    setPasswordMatch(password === inputConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!emailValid || !strongPassword || !passwordMatch) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const newUser = { username, email, password };
      const signupRes = await fetch("/api/users/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!signupRes.ok) {
        const errorData = await signupRes.json();
        throw new Error(errorData.message || 'Signup failed.');
      }

      // Automatically login the user
      const loginRes = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        const loginError = await loginRes.json();
        throw new Error(loginError.message || 'Login failed.');
      }

      const loginData = await loginRes.json();
      localStorage.setItem('userData', JSON.stringify(loginData));
      onLogin(true); // Set isFirstLogin to true or handle accordingly
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
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
}
