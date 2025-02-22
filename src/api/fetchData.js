export async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
