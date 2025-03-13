import { apiFetch } from "./apiFetch";

export async function authRegister(user) {
  const endpoint = "/auth/register";
  const options = {
    method: "POST",
    body: JSON.stringify(user),
  };

  try {
    const result = await apiFetch(endpoint, options, false); // Use the endpoint
    console.log("Registration data:", result);
    return result;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}
