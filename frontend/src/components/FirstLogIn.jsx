import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function FirstLogin({ children }) {
    const { isFirstLogin } = useContext(AuthContext);
  
    if (!isFirstLogin) {
      return <Navigate to="/" />;
    }
  
    return children;
  }
export default FirstLogin;