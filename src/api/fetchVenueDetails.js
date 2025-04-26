import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Fetches detailed information about a specific venue, including its owner and bookings.
 *
 * @async
 * @function
 * @param {string} id - The ID of the venue to fetch details for.
 * @returns {Promise<Object>} The venue details from the API, including owner and bookings information.
 *
 * @throws {Error} Throws an error if the request fails or the API returns an error.
 *
 * @example
 * try {
 *   const venueDetails = await fetchVenueDetails("12345");
 *   console.log("Venue details:", venueDetails);
 * } catch (error) {
 *   console.error("Failed to fetch venue details:", error);
 * }
 */
export async function fetchVenueDetails(id) {
  const endpoint = `${API_HOLIDAZE_BASE}/venues/${id}?_owner=true&_bookings=true`;
  return await apiFetch(endpoint, {}, false);
}
