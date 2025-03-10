import { apiFetch } from "./apiFetch";

export async function fetchProfile() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  const endpoint = `/profiles/${userName}?_bookings=true&_venues=true`;
  const data = await apiFetch(endpoint);

  if (!data || typeof data !== "object") {
    throw new Error("Data is not an object");
  }

  console.log(`Fetched profile ${userName}:`, data);

  return data;
}
