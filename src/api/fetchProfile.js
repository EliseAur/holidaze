import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

export async function fetchProfile() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  const endpoint = `${API_HOLIDAZE_BASE}/profiles/${userName}?_bookings=true&_venues=true`;
  const data = await apiFetch(endpoint);

  if (!data || typeof data !== "object") {
    throw new Error("Data is not an object");
  }

  console.log(`Fetched profile ${userName}:`, data);

  return data;
}
