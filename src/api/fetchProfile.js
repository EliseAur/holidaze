import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Fetches the profile data for the currently logged-in user, including their bookings and venues.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The profile data from the API, including bookings and venues.
 *
 * @throws {Error} Throws an error if the user name is not found in local storage, the request fails, or the response data is invalid.
 *
 * @example
 * try {
 *   const profile = await fetchProfile();
 *   console.log("Profile data:", profile);
 * } catch (error) {
 *   console.error("Failed to fetch profile:", error);
 * }
 */
export async function fetchProfile() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  const endpoint = `${API_HOLIDAZE_BASE}/profiles/${userName}?_bookings=true&_venues=true`;
  const data = await apiFetch(endpoint);

  if (!data || typeof data !== "object") {
    throw new Error("Data is not an object");
  }

  return data;
}
