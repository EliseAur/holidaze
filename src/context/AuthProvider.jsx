import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the token exists in local storage
    return !!localStorage.getItem("token");
  });

  // Function to handle login
  const handleLogin = (token, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("favorites");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
