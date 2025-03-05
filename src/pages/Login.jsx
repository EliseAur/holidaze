import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    // // Log the user object
    // console.log("User login data:", user);

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

        // Store the token in local storage
        if (result.data && result.data.accessToken) {
          localStorage.setItem("token", result.data.accessToken);
          navigate("/");
        } else {
          console.error("Token not found in the response");
        }
      } else {
        const errorData = await response.json();
        console.error("Error logging in:", errorData);
        throw new Error("An error occurred when logging in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-xs p-4 mx-auto">
      <h1 className="text-4xl font-black italic text-lightGreen text-shadow mb-4">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-beige text-shadow"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
              placeholder="name@stud.noroff.no"
              required
            />
            {/* <p className="text-red-600 text-sm">{errors.email?.message}</p> */}
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-beige text-shadow"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none"
              placeholder="Enter password"
              required
            />

            {/* <p className="text-red-600 text-sm">{errors.subject?.message}</p> */}
          </div>
        </div>
        <button
          type="submit"
          className="bg-lightGreen text-black font-bold p-2 mt-4 w-full rounded-sm shadow-custom-dark hover:bg-darkGreen"
        >
          Login
        </button>
        <div className="mt-10 text-beige font-regular text-shadow">
          <p>Not a member yet?</p>
        </div>
        <Link
          to="/register"
          className="bg-black text-white text-center font-bold p-2 w-full rounded-sm shadow-custom-dark hover:bg-gray-900 hover:text-white transition duration-200 block cursor-pointer"
        >
          Register
        </Link>
      </form>
    </div>
  );
}
