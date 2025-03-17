import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

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
