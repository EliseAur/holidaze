import { API_BASE_URL, API_KEY, getAuthToken } from "./apiConfig";

export async function apiFetch(endpoint, options = {}, requireAuth = true) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...options.headers,
  };

  if (requireAuth) {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No token found");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null; // No content to parse
    }

    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      const error = new Error(
        result.errors ? result.errors[0].message : "An error occurred",
      );
      error.status = result.status;
      error.statusCode = result.statusCode;
      throw error;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
