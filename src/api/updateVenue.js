import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Updates an existing venue with the provided data.
 *
 * @async
 * @function
 * @param {string} venueId - The ID of the venue to update.
 * @param {Object} updatedVenue - The updated venue data.
 * @returns {Promise<Object>} The response data from the API, including the updated venue details.
 *
 * @throws {Error} Throws an error if the request fails or the API returns an error.
 *
 * @example
 * const updatedVenueData = {
 *   name: "Updated Luxury Villa",
 *   description: "An updated description for the villa.",
 *   price: 600,
 *   maxGuests: 12,
 *   media: [{ url: "https://example.com/image.jpg" }],
 * };
 * const updatedVenue = await updateVenue("12345", updatedVenueData);
 * console.log("Venue updated successfully:", updatedVenue);
 */
export async function updateVenue(venueId, updatedVenue) {
  if (!venueId) {
    throw new Error("Venue ID is required to update a venue");
  }

  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  // Remove URLs for media if they are empty or invalid
  if (updatedVenue.media) {
    updatedVenue.media = updatedVenue.media.filter((media) => {
      return media.url && media.url.trim() !== "";
    });
  }

  const endpoint = `${API_HOLIDAZE_BASE}/venues/${venueId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedVenue),
  };

  try {
    const data = await apiFetch(endpoint, options);

    if (!data || typeof data !== "object") {
      throw new Error("Data is not an object");
    }

    return data;
  } catch (error) {
    // Extract the image URL from the error message if applicable
    const imageUrlMatch = error.message.match(/https?:\/\/[^\s]+/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[0] : null;

    // Include the image URL in the custom error object
    const customError = new Error(
      "Failed to update venue. Please check the provided data.",
    );
    customError.imageUrl = imageUrl;
    throw customError;
  }
}
