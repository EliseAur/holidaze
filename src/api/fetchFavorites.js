import { fetchVenueDetails } from "./fetchVenueDetails";

// retrieves favorite IDs from local storage and fetches venue details for each ID.

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
