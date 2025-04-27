import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Sends booking data to the API to create a new booking.
 *
 * @async
 * @function
 * @param {Object} bookingData - The data for the booking to be created.
 * @param {string} bookingData.dateFrom - The start date of the booking (ISO string).
 * @param {string} bookingData.dateTo - The end date of the booking (ISO string).
 * @param {number} bookingData.guests - The number of guests for the booking.
 * @param {string} bookingData.venueId - The ID of the venue being booked.
 * @returns {Promise<Object>} The response data from the API, including the booking details.
 *
 * @throws {Error} Throws an error if the request fails or the API returns an error.
 *
 * @example
 * const bookingData = {
 *   dateFrom: "2025-04-01T00:00:00.000Z",
 *   dateTo: "2025-04-05T00:00:00.000Z",
 *   guests: 2,
 *   venueId: "12345",
 * };
 * const booking = await fetchBooking(bookingData);
 * console.log("Booking successful:", booking);
 */
export async function fetchBooking(bookingData) {
  const endpoint = `${API_HOLIDAZE_BASE}/bookings`;
  const options = {
    method: "POST",
    body: JSON.stringify(bookingData),
  };
  return apiFetch(endpoint, options);
}
