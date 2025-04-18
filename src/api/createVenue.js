import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

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

    console.log(`Created Venue by ${userName}:`, data);

    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    console.log("I need the image link provided in the form", error.message);

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
