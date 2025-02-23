import { fetchData } from "./fetchData";

export async function fetchVenueDetails(id) {
  const url = `https://v2.api.noroff.dev/holidaze/venues/${id}`;
  return await fetchData(url);
}
