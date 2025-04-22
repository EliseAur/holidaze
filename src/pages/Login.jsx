import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authLogin } from "../api/authLogin";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

// Define the validation schema using yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
      "Email must be in the format name@stud.noroff.no",
    )

    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [apiError, setApiError] = useState(""); // State to track API error messages

  // Initialize react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const result = await authLogin(data.email, data.password);
      console.log("Login response:", result);

      // Store the token in local storage
      if (result && result.accessToken && result.name) {
        handleLogin(result.accessToken, result.name, result.venueManager);
        navigate("/account");
      } else {
        setApiError("Unexpected error occurred. Please try again.");
        console.error("Token or name not found in the response");
      }
    } catch (error) {
      console.error("1) Error logging in:", error);

      // Log the entire error object to inspect its structure
      console.log("Full error object:", error);
      if (error.message) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-xs p-4 mx-auto">
      <h1 className="text-4xl font-black italic text-lightGreen text-shadow mb-4">
        Login
      </h1>
      {/* Display API error message */}
      {apiError && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-100 p-2 rounded-sm shadow-custom-dark border-1 border-red-400">
          {apiError}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email")} // Register the email field
              className={`px-2 py-1 border ${
                errors.email ? "border-red-500" : "border-darkBeige"
              } bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none`}
              placeholder="name@stud.noroff.no"
            />
            {errors.email && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded-sm mt-1 shadow-custom-dark border-2 border-red-400">
                {errors.email.message}
              </p>
            )}
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
              {...register("password")} // Register the password field
              className={`px-2 py-1 border ${
                errors.password ? "border-red-500" : "border-darkBeige"
              } bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded-sm mt-1 shadow-custom-dark border-2 border-red-400">
                {errors.password.message}
              </p>
            )}
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
