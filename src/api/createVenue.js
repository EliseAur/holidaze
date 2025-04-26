import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Creates a new venue by sending the provided venue data to the API.
 *
 * @async
 * @function
 * @param {Object} createdVenue - The data for the venue to be created.
 * @returns {Promise<Object>} The response data from the API, including the created venue details.
 *
 * @throws {Error} Throws an error if the request fails or the API returns an error.
 *
 * @example
 * const venueData = {
 *   name: "Luxury Villa",
 *   description: "A beautiful villa with ocean views.",
 *   price: 500,
 *   maxGuests: 10,
 * };
 * const createdVenue = await createVenue(venueData);
 * console.log("Venue created successfully:", createdVenue);
 */
export async function createVenue(createdVenue) {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  const endpoint = `${API_HOLIDAZE_BASE}/venues`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdVenue),
  };

  try {
    const data = await apiFetch(endpoint, options);

    if (!data || typeof data !== "object") {
      throw new Error("Data is not an object");
    }

    return data;
  } catch (error) {
    // Extract the image URL from the error message
    const imageUrlMatch = error.message.match(/https?:\/\/[^\s]+/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[0] : null;

    // Include the image URL in the custom error object
    const customError = new Error(
      "Failed to create venue. Please check the provided data.",
    );
    customError.imageUrl = imageUrl;
    throw customError;
  }
}
