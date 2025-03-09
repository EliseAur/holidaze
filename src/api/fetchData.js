export async function fetchData(url) {
  const token = localStorage.getItem("token");
  const apiKey = "4b610d11-d5e1-4d4d-a3fb-82542f6e858e"; // Hardcoded API key

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Fetched data:", result);
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
