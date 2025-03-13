import { apiFetch } from "./apiFetch";
import { API_HOLIDAZE_BASE } from "./apiConfig";

export async function fetchLatestVenues() {
  const endpoint = `${API_HOLIDAZE_BASE}/venues?limit=9&sort=created&sortOrder=desc`;
  const data = await apiFetch(endpoint);

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  console.log("Fetched Latest venues:", data);

  return data;
}

export async function fetchAllVenues(page = 1, limit = 12) {
  const endpoint = `${API_HOLIDAZE_BASE}/venues?sort=created&sortOrder=desc&limit=${limit}&page=${page}`;
  const data = await apiFetch(endpoint);

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  console.log("Fetched All venues", data);

  return data;
}
