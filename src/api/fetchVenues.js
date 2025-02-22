import { fetchData } from "./fetchData";

export async function fetchVenues() {
  const url = "https://v2.api.noroff.dev/holidaze/venues";
  const data = await fetchData(url);

  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  console.log("Fetched venues:", data);

  return data;
}
