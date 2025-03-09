import { fetchData } from "./index";

export async function fetchProfile() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    throw new Error("No user name found");
  }

  const url = `https://v2.api.noroff.dev/holidaze/profiles/${userName}?_bookings=true&_venues=true`;
  const data = await fetchData(url);

  if (!data || typeof data !== "object") {
    throw new Error("Data is not an object");
  }

  console.log("Fetched profile:", data);

  return data;
}
