import { useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

/**
 * AuthProvider component manages authentication state and provides it to child components.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to wrap with the provider.
 * @returns {JSX.Element} The AuthContext provider.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the token exists in local storage
    return !!localStorage.getItem("token");
  });

  const [venueManager, setVenueManager] = useState(() => {
    // Check if venueManager exists in local storage
    const storedVenueManager = localStorage.getItem("venueManager");
    return storedVenueManager === "true"; // Convert string to boolean
  });

  // Function to handle login
  const handleLogin = (token, userName, isVenueManager) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("venueManager", isVenueManager);
    setIsLoggedIn(true);
    setVenueManager(isVenueManager);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("venueManager");
    localStorage.removeItem("favorites");
    setIsLoggedIn(false);
    setVenueManager(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, venueManager, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
