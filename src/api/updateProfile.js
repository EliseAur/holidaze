import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

/**
 * Updates the profile of the currently logged-in user with the provided data.
 *
 * @async
 * @function
 * @param {Object} updatedProfile - The updated profile data.
 * @returns {Promise<Object>} The response data from the API, including the updated profile details.
 *
 * @throws {Error} Throws an error if the user name is not found in local storage, the request fails, or the response data is invalid.
 *
 * @example
 * const profileData = {
 *   bio: "Updated bio",
 *   avatar: { url: "https://example.com/avatar.jpg" },
 * };
 * try {
 *   const updatedProfile = await updateProfile(profileData);
 *   console.log("Profile updated successfully:", updatedProfile);
 * } catch (error) {
 *   console.error("Failed to update profile:", error);
 * }
 */
export async function updateProfile(updatedProfile) {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  const endpoint = `${API_HOLIDAZE_BASE}/profiles/${userName}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProfile),
  };

  const data = await apiFetch(endpoint, options);

  if (!data || typeof data !== "object") {
    throw new Error("Data is not an object");
  }

  console.log(`Updated profile ${userName}:`, data);

  return data;
}
