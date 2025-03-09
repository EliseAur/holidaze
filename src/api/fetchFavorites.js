import { fetchVenueDetails } from "./fetchVenueDetails";

export async function fetchFavorites() {
  // Retrieve favorites from local storage
  const storedFavoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  // Fetch venue details for each ID
  const fetchedVenues = await Promise.all(
    storedFavoriteIds.map(async (id) => {
      const venue = await fetchVenueDetails(id);
      return venue;
    }),
  );

  return fetchedVenues;
}
