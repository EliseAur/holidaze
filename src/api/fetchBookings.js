import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

export async function fetchBooking(bookingData) {
  const endpoint = `${API_HOLIDAZE_BASE}/bookings`;
  const options = {
    method: "POST",
    body: JSON.stringify(bookingData),
  };
  return apiFetch(endpoint, options);
}
