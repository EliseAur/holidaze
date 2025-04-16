import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Deletes a venue by its ID.
 * @param {string} id - The ID of the venue to delete.
 * @returns {Promise<void>} - Resolves if the venue is deleted successfully.
 * @throws {Error} - Throws an error if the deletion fails.
 */
export async function deleteVenue(id) {
  if (!id) {
    throw new Error("Venue ID is required to delete a venue.");
  }

  const endpoint = `${API_HOLIDAZE_BASE}/venues/${id}`;
  const options = {
    method: "DELETE",
  };

  try {
    await apiFetch(endpoint, options);
    console.log(`Venue with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete venue with ID ${id}:`, error);
    throw error;
  }
}
