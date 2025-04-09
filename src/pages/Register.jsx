import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authRegister } from "../api/authRegister";
import { SwitchField } from "../components";
import { useState } from "react";

// Define the validation schema using yup
const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
      "Email must be in the format name@stud.noroff.no",
    )
    .required("Email is required"),
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  venueManager: yup.boolean(),
});

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(""); // State to track API error messages

  // Initialize react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const result = await authRegister(data);
      console.log("Registration response:", result);
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
      {/* Display API error message */}
      {apiError && (
        <p className="text-red-600 text-sm text-center mb-4 bg-red-200 p-2 rounded-sm shadow-custom-dark border-2 border-red-500">
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

          {/* Username input */}
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
              {...register("name")} // Register the username field
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

          {/* Venue Manager toggle */}
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
