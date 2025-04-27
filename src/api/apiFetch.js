import { API_BASE_URL, API_KEY, getAuthToken } from "./apiConfig";

/**
 * Makes an API request to the specified endpoint with the provided options.
 * Handles authentication, headers, and error responses.
 *
 * @async
 * @function
 * @param {string} endpoint - The API endpoint to fetch (e.g., `/venues`).
 * @param {Object} [options={}] - Additional options for the fetch request (e.g., method, body, headers).
 * @param {boolean} [requireAuth=true] - Whether the request requires authentication. If `true`, includes the Authorization header.
 * @returns {Promise<Object|null>} The parsed JSON response from the API, or `null` if the response status is 204 (No Content).
 *
 * @throws {Error} Throws an error if the request fails, the response is not OK, or no authentication token is found when required.
 *
 * @example
 * // Example: Fetching a list of venues
 * const venues = await apiFetch("/venues");
 *
 * @example
 * // Example: Creating a new venue with authentication
 * const newVenue = await apiFetch("/venues", {
 *   method: "POST",
 *   body: JSON.stringify({ name: "New Venue", price: 100 }),
 * }, true);
 *
 * @example
 * // Example: Fetching without authentication
 * const publicData = await apiFetch("/public-endpoint", {}, false);
 */
export async function apiFetch(endpoint, options = {}, requireAuth = true) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...options.headers,
  };

  if (requireAuth) {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No token found");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null; // No content to parse
    }

    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      const error = new Error(
        result.errors ? result.errors[0].message : "An error occurred",
      );
      error.status = result.status;
      error.statusCode = result.statusCode;
      throw error;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
