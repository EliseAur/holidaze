import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Custom hook to access authentication context.
 *
 * @returns {Object} Authentication state and functions.
 */
export function useAuth() {
  return useContext(AuthContext);
}
