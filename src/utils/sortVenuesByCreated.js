/**
 * Sorts a list of venues by their `created` property in descending order.
 *
 * @param {Array} venues - The list of venues to sort.
 * @param {string} venues[].created - The creation date of the venue in ISO format.
 * @returns {Array} A new array of venues sorted by `created` in descending order.
 *
 * @example
 * const venues = [
 *   { id: 1, created: "2025-05-01" },
 *   { id: 2, created: "2025-04-01" },
 * ];
 * const sortedVenues = sortVenuesByCreated(venues);
 * console.log(sortedVenues);
 * // [
 * //   { id: 1, created: "2025-05-01" },
 * //   { id: 2, created: "2025-04-01" }
 * // ]
 */
export function sortVenuesByCreated(venues) {
  return venues
    .slice()
    .sort((a, b) => new Date(b.created) - new Date(a.created));
}
