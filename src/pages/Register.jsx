import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../schemas";
import { authRegister } from "../api/authRegister";
import { SwitchField } from "../components";
import { useState } from "react";
import useSEO from "../hooks/useSEO";

/**
 * Register component for creating a new Holidaze account.
 * Allows users to register by providing their email, username, and password.
 * Users can also choose to register as a venue manager.
 * Validates the form using `react-hook-form` and `yup`, and handles API errors gracefully.
 * Redirects the user to the login page upon successful registration.
 *
 * @component
 * @returns {JSX.Element} The rendered Register component.
 *
 * @example
 * <Register />
 */
export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(""); // State to track API error messages

  useSEO({
    title: "Holidaze | Register",
    description:
      "Create your Holidaze account to book venues, manage your bookings, and become a host. Register now to start planning your next getaway.",
    keywords:
      "register, Holidaze account, create account, book venues, become a host",
  });

  // Initialize react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      venueManager: false, // Initialize venueManager to false
    },
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });

  /**
   * Handles the form submission for user registration.
   * Sends the user's registration data to the API and processes the response.
   * If successful, navigates the user to the login page.
   * If an error occurs, sets an appropriate error message.
   *
   * @async
   * @param {Object} data - The form data containing the user's registration details.
   * @param {string} data.email - The user's email address.
   * @param {string} data.name - The user's username.
   * @param {string} data.password - The user's password.
   * @param {boolean} [data.venueManager] - Indicates if the user wants to register as a venue manager.
   * @returns {Promise<void>} Resolves when the registration process is complete.
   *
   * @example
   * const data = { email: "user@example.com", name: "username", password: "password123", venueManager: true };
   * await onSubmit(data);
   */
  const onSubmit = async (data) => {
    try {
      await authRegister(data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);

      // Extract the error message from the API response
      if (error.message) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-xs p-4 mx-auto">
      <h1 className="text-4xl font-black italic text-lightGreen text-shadow mb-2">
        Register
      </h1>
      <p className="font-bold text-md text-beige text-shadow mb-4 leading-tight">
        To book venues and to become a host, please register your details below.
      </p>
      {apiError && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-200 p-2 rounded-sm shadow-custom-dark border-2 border-red-500">
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
                errors.email ? "border-red-400" : "border-darkBeige"
              } bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none`}
              placeholder="name@stud.noroff.no"
            />
            {errors.email && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded-sm mt-1 shadow-custom-dark border-1 border-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-beige text-shadow"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`px-2 py-1 border ${
                errors.name ? "border-red-400" : "border-darkBeige"
              } bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none`}
              placeholder="user_name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded-sm mt-1 shadow-custom-dark border-1 border-red-400">
                {errors.name.message}
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
                errors.password ? "border-red-400" : "border-darkBeige"
              } bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-lightGreen focus:border-2 focus:ring-lightGreen focus:outline-none`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded-sm mt-1 shadow-custom-dark border-1 border-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="text-sm">
            <label
              htmlFor="venueManager"
              className="block text-base text-beige font-bold text-shadow mb-1"
            >
              Register as a host?
            </label>
            <SwitchField
              label={
                watch("venueManager") // Dynamically update the label based on the value
                  ? "Yes, I want to register as a venue manager"
                  : "Not yet.."
              }
              checked={!!watch("venueManager")} // Use react-hook-form's watch to track the value
              onChange={(value) => setValue("venueManager", value)} // Update the value in react-hook-form
              textColor="text-beige"
              textShadow="text-shadow"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-lightGreen text-black font-bold p-2 mt-4 w-full rounded-sm shadow-custom-dark hover:bg-darkGreen cursor-pointer"
        >
          Register
        </button>
        <div className="mt-10 text-beige font-regular text-shadow">
          <p>Already a member?</p>
        </div>
        <Link
          to="/login"
          className="bg-black text-white text-center font-bold p-2 w-full rounded-sm shadow-custom-dark hover:bg-gray-900 transition duration-200 block cursor-pointer"
        >
          Login
        </Link>
      </form>
    </div>
  );
}
