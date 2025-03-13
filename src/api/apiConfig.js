export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_HOLIDAZE_BASE = `/holidaze`;
export const API_KEY = "4b610d11-d5e1-4d4d-a3fb-82542f6e858e";

export function getAuthToken() {
  return localStorage.getItem("token");
}
