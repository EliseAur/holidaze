import { apiFetch } from "./apiFetch";

export async function fetchVenueDetails(id) {
  const endpoint = `/venues/${id}?_owner=true&_bookings=true`;
  return await apiFetch(endpoint);
}
