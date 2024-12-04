import React, { useState } from 'react';
import '../SignUpPage/SignUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import background from '../../assets/syksytausta.jpg';
import { REACT_APP_API_URL } from '../../utils/apiConfig';

const LogIn = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState("");
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState('');
    const mockEmail = 'testi@testi.com'
    const mockPassword = 'testi123'
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        document.body.style.backgroundImage = `url(${background})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        
    }, []);

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

}

    const handlePasswordChange = (e) => {
      const inputPassword = e.target.value;
        setPassword(inputPassword);
 
    }

    const handleLogIn = (e) => {
        e.preventDefault();
    
        
        const isEmailValid = email === mockEmail;
        const isPasswordValid = password === mockPassword;
        
        setEmailValid(isEmailValid)
        setPasswordValid(isPasswordValid)
          
        const fetchUser = async () => {
          try {
            const loginDetails = {
                email,
                password
             }
             console.log(loginDetails)
     
            const res = await fetch(`${REACT_APP_API_URL}/login`, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(loginDetails)
              });
              const userData = await res.json();
              console.log(userData)

              if(res.ok){
                setEmailValid(true)
                setPasswordValid(true)
                localStorage.setItem("userData", JSON.stringify(userData))
                onLogin();
                navigate('/profile');
                console.log('Log In Successful' + ' ' + email + ' ' + password);
              } else {
                console.log('Log In Failed');
                setShowError(true);
              }

            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
          fetchUser();
    
    };
    


    return (
        <div className="container">
            <h1>Log In</h1>
            <form className="form" onSubmit={handleLogIn}>
                <p className="description">Email</p>
                <input 
                type="Email"
                placeholder="Enter your email"
                value={email}
                onChange ={handleEmailChange} 
                className={emailValid ? 'valid' : 'invalid'} 
                required/>
                <p className="description">Password</p>
                <input
                 type="password" 
                 placeholder="Enter your password"
                 value= {password}
                 onChange = {handlePasswordChange} 
                className={passwordValid ? 'valid' : 'invalid'}
                 required />
                 {showError && <p className="error-message">Invalid email or password</p>}
                <button type="submit" className="signin-button">Log In</button>
                <p className="sign-up-link">
                    Not a member? <Link to="/signup">Sign Up here</Link>
                </p>
            </form>
        </div>
    );
}

export default LogIn;

