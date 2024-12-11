import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext
import useLogIn from "../../hooks/useLogin"; // Import the useLogIn hook
import { Link } from "react-router-dom";

function LogIn() {
  const { login } = useContext(AuthContext); // Extract login method from AuthContext
  const { email, password, showError, handleLogIn } = useLogIn(login);

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
}

export default LogIn;
