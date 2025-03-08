import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../auth/authLogin";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await authLogin(email, password);

      // Store the token in local storage
      if (result.data && result.data.accessToken) {
        localStorage.setItem("token", result.data.accessToken);
        handleLogin();
        navigate("/");
      } else {
        console.error("Token not found in the response");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
