import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

export async function fetchVenueDetails(id) {
  const endpoint = `${API_HOLIDAZE_BASE}/venues/${id}?_owner=true&_bookings=true`;
  return await apiFetch(endpoint, {}, false);
}
