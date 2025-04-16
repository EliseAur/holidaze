import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

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

    console.log(`Updated Venue by ${userName}:`, data);

    return data;
  } catch (error) {
    console.error("Error updating venue:", error);

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
