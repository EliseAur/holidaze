import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Fetches the latest venues from the API, sorted by creation date in descending order.
 *
 * @async
 * @function
 * @param {number} [limit=12] - The maximum number of venues to fetch.
 * @returns {Promise<Array<Object>>} An array of the latest venue details.
 *
 * @throws {Error} Throws an error if the response data is not an array.
 *
 * @example
 * const latestVenues = await fetchLatestVenues(10);
 * console.log("Latest venues:", latestVenues);
 */
export async function fetchLatestVenues(limit = 12) {
  const endpoint = `${API_HOLIDAZE_BASE}/venues?limit=${limit}&sort=created&sortOrder=desc`;
  const data = await apiFetch(endpoint, {}, false); // Set requireAuth to false

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  return data;
}

/**
 * Fetches all venues from the API with pagination, sorted by creation date in descending order.
 *
 * @async
 * @function
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=12] - The maximum number of venues per page.
 * @returns {Promise<Array<Object>>} An array of venue details for the specified page.
 *
 * @throws {Error} Throws an error if the response data is not an array.
 *
 * @example
 * const venues = await fetchAllVenues(2, 10);
 * console.log("Venues on page 2:", venues);
 */
export async function fetchAllVenues(page = 1, limit = 12) {
  const endpoint = `${API_HOLIDAZE_BASE}/venues?limit=${limit}&sort=created&sortOrder=desc&page=${page}`;
  const data = await apiFetch(endpoint, {}, false); // Set requireAuth to false

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  return data;
}

/**
 * Fetches all venues from the API without pagination, sorted by creation date in descending order.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>>} An array of all venue details.
 *
 * @throws {Error} Throws an error if the response data is not an array.
 *
 * @example
 * const allVenues = await fetchAllVenuesWithoutPagination();
 * console.log("All venues:", allVenues);
 */
export async function fetchAllVenuesWithoutPagination() {
  const endpoint = `${API_HOLIDAZE_BASE}/venues?sort=created&sortOrder=desc`; // No limit or page
  const data = await apiFetch(endpoint, {}, false); // Set requireAuth to false

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  return data;
}
