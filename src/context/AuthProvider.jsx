import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the token exists in local storage
    return !!localStorage.getItem("token");
  });
  // const navigate = useNavigate(); // Use the useNavigate hook

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
    setIsLoggedIn(false);
    // navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
