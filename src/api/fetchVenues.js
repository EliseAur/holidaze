import { fetchData } from "./fetchData";

export async function fetchLatestVenues() {
  const url =
    "https://v2.api.noroff.dev/holidaze/venues?limit=9&sort=created&sortOrder=desc";
  const data = await fetchData(url);

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  console.log("Fetched Latest venues:", data);

  return data;
}

export async function fetchAllVenues(page = 1, limit = 12) {
  const url = `https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc&limit=${limit}&page=${page}`;
  const data = await fetchData(url);

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  console.log("Fetched All venues:", data);

  return data;
}
