import { fetchData } from "./fetchData";

export async function fetchVenueDetails(id) {
  const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`;
  return await fetchData(url);
}
