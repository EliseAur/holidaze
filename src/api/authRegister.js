import { apiFetch } from "./apiFetch";

/**
 * Registers a new user by sending their details to the registration API.
 *
 * @async
 * @function
 * @param {Object} user - The user data to register.
 * @param {string} user.name - The user's name.
 * @param {string} user.email - The user's email address.
 * @param {string} user.password - The user's password.
 * @param {boolean} [user.venueManager=false] - Indicates if the user is registering as a venue manager.
 * @returns {Promise<Object>} The response data from the API, including the registered user details.
 *
 * @throws {Error} Throws an error if the registration request fails or the API returns an error.
 *
 * @example
 * // Example usage:
 * try {
 *   const userData = {
 *     name: "John Doe",
 *     email: "john.doe@example.com",
 *     password: "password123",
 *     venueManager: true,
 *   };
 *   const registrationData = await authRegister(userData);
 *   console.log("Registration successful:", registrationData);
 * } catch (error) {
 *   console.error("Registration failed:", error);
 * }
 */
export async function authRegister(user) {
  const endpoint = "/auth/register";
  const options = {
    method: "POST",
    body: JSON.stringify(user),
  };

  try {
    const result = await apiFetch(endpoint, options, false); // Use the endpoint
    return result;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}
