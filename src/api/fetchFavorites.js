import { fetchVenueDetails } from "./fetchVenueDetails";

/**
 * Retrieves favorite venue IDs from local storage and fetches venue details for each ID.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>>} An array of venue details for the user's favorite venues.
 * Invalid or unavailable venues are filtered out.
 *
 * @throws {Error} Logs an error for each failed venue fetch but does not stop execution.
 *
 * @example
 * const favorites = await fetchFavorites();
 * console.log("Favorite venues:", favorites);
 */
export async function fetchFavorites() {
  // Retrieve favorites from local storage
  const storedFavoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  // Fetch venue details for each ID
  const fetchedVenues = await Promise.all(
    storedFavoriteIds.map(async (id) => {
      try {
        const venue = await fetchVenueDetails(id);
        return venue;
      } catch (error) {
        console.error(`Error fetching venue with ID ${id}:`, error);
        return null; // Return null for invalid venues
      }
    }),
  );

  // Filter out any null values (invalid venues)
  return fetchedVenues.filter((venue) => venue !== null);
}
