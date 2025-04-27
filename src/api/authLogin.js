import { apiFetch } from "./apiFetch";

/**
 * Authenticates a user by sending their email and password to the login API.
 *
 * @async
 * @function
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The response data from the API, including the authentication token and user details.
 *
 * @throws {Error} Throws an error if the login request fails or the API returns an error.
 *
 * @example
 * // Example usage:
 * try {
 *   const loginData = await authLogin("user@example.com", "password123");
 *   console.log("Login successful:", loginData);
 * } catch (error) {
 *   console.error("Login failed:", error);
 * }
 */
export async function authLogin(email, password) {
  const user = {
    email,
    password,
  };

  const endpoint = "/auth/login?_holidaze=true";
  const options = {
    method: "POST",
    body: JSON.stringify(user),
  };

  try {
    const result = await apiFetch(endpoint, options, false);
    return result;
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
}
