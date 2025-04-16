import { apiFetch } from "./apiFetch";

export async function authLogin(email, password) {
  const user = {
    email,
    password,
  };

  const endpoint = "/auth/login?_holidaze=true";
  const options = {
    method: "POST",
    body: JSON.stringify(user),
  };

  try {
    const result = await apiFetch(endpoint, options, false);
    console.log("Login data:", result);
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
