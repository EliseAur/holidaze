import { apiFetch } from "./apiFetch";

export async function fetchBooking(bookingData) {
  const endpoint = "/bookings";
  const options = {
    method: "POST",
    body: JSON.stringify(bookingData),
  };
  return apiFetch(endpoint, options);
}
