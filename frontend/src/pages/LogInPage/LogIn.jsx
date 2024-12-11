
import '../../pages/SignUpPage/SignUp.css';
import { Link } from 'react-router-dom';
import useLogIn from '../../hooks/useLogin';

const LogIn = ({ onLogin }) => {
  const {
    email,
    password,
    showError,
    handleLogIn,
  } = useLogIn(onLogin);

  return (
    <div className="container">
      <h1>Log In</h1>
      <form className="form" onSubmit={handleLogIn}>
        <p className="description">Email</p>
        <input {...email} />
        <p className="description">Password</p>
        <input {...password} />
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
