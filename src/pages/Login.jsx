import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../schemas";
import { authLogin } from "../api/authLogin";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import useSEO from "../hooks/useSEO";

/**
 * Login component for user authentication.
 * Allows users to log in to their Holidaze account by submitting their email and password.
 * Validates the form using `react-hook-form` and `yup`, and handles API errors gracefully.
 * Redirects the user to their account page upon successful login.
 *
 * @component
 * @returns {JSX.Element} The rendered Login component.
 *
 * @example
 * <Login />
 */
export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [apiError, setApiError] = useState(""); // State to track API error messages

  useSEO({
    title: "Holidaze | Login",
    description:
      "Log in to your Holidaze account to manage your bookings, favorite venues, and hosted venues. Access your profile and start planning your next getaway.",
    keywords:
      "login, Holidaze account, manage bookings, favorite venues, hosted venues",
  });

  // Initialize react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });

  /**
   * Handles the form submission for user login.
   * Sends the user's email and password to the authentication API and processes the response.
   * If successful, stores the user's token and navigates to the account page.
   * If an error occurs, sets an appropriate error message.
   *
   * @async
   * @param {Object} data - The form data containing the user's email and password.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   * @returns {Promise<void>} Resolves when the login process is complete.
   *
   * @example
   * const data = { email: "user@example.com", password: "password123" };
   * await onSubmit(data);
   */
  const onSubmit = async (data) => {
    try {
      const result = await authLogin(data.email, data.password);

      // Check if the response contains the required data
      if (result && result.accessToken && result.name) {
        handleLogin(result.accessToken, result.name, result.venueManager);
        navigate("/account");
      } else {
        setApiError(errors.message);
      }
    } catch (error) {
      if (error.message) {
        setApiError(error.message);
        console.error("Test error1", error.message);
      } else {
        setApiError(
          error.message || "An unexpected error occurred. Please try again.",
        );
        console.error("Test error2", error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-xs p-4 mx-auto">
      <h1 className="text-4xl font-black italic text-lightGreen text-shadow mb-4">
        Login
      </h1>
      {apiError && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-100 p-2 rounded-sm shadow-custom-dark border-1 border-red-400">
          {apiError}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 mb-4">
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
              {...register("email")}
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
              {...register("password")}
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
