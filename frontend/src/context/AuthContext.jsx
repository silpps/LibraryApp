import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { token } = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setToken(token);
      setIsFirstLogin(false);
    }
  }, []);

  const login = (userData) => {
    console.log("userData in context:", userData);
    setIsLoggedIn(true);
    setToken(userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("userData");

  };

  const authValue = {
    isLoggedIn,
    token,
    isFirstLogin,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

