/**
 * Sorts a list of bookings by their `dateFrom` property in ascending order.
 *
 * @param {Array} bookings - The list of bookings to sort.
 * @param {string} bookings[].dateFrom - The start date of the booking in ISO format.
 * @returns {Array} A new array of bookings sorted by `dateFrom` in ascending order.
 *
 * @example
 * const bookings = [
 *   { id: 1, dateFrom: "2025-05-01" },
 *   { id: 2, dateFrom: "2025-04-01" },
 * ];
 * const sortedBookings = sortBookingsByDate(bookings);
 * console.log(sortedBookings);
 * // [
 * //   { id: 2, dateFrom: "2025-04-01" },
 * //   { id: 1, dateFrom: "2025-05-01" }
 * // ]
 */
export function sortBookingsByDate(bookings) {
  return bookings
    .slice()
    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
}
