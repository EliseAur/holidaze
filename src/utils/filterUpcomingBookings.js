/**
 * Filters a list of bookings to include only upcoming bookings.
 * A booking is considered upcoming if its `dateFrom` is greater than or equal to the current date.
 *
 * @param {Array} bookings - The list of bookings to filter.
 * @param {string} bookings[].dateFrom - The start date of the booking in ISO format.
 * @returns {Array} An array of bookings that are upcoming.
 *
 * @example
 * const bookings = [
 *   { id: 1, dateFrom: "2025-05-01" },
 *   { id: 2, dateFrom: "2025-04-01" },
 * ];
 * const upcomingBookings = filterUpcomingBookings(bookings);
 * console.log(upcomingBookings); // [{ id: 1, dateFrom: "2025-05-01" }]
 */
export function filterUpcomingBookings(bookings) {
  return bookings.filter((booking) => new Date(booking.dateFrom) >= new Date());
}
