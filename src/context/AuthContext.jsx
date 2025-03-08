import { createContext } from "react";

export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     // Check if the token exists in local storage
//     return !!localStorage.getItem("token");
//   });

//   // Function to handle login
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
