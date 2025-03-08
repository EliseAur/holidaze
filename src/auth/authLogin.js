export async function authLogin(email, password) {
  const user = {
    email,
    password,
  };

  const url = "https://v2.api.noroff.dev/auth/login?_holidaze=true";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "4b610d11-d5e1-4d4d-a3fb-82542f6e858e",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Login data:", result);
      console.log("stringify JSON:", JSON.stringify(result));

      // Check the structure of the response object
      console.log("Response object:", result);

      // Return the result
      return result;
    } else {
      const errorData = await response.json();
      console.error("Error logging in:", errorData);
      throw new Error("An error occurred when logging in");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
