import * as yup from "yup";

/**
 * RegisterSchema
 *
 * A `yup` schema for validating registration data.
 * Ensures the email, username, password, and venue manager fields meet validation criteria.
 *
 * @returns {yup.ObjectSchema} A schema object for validating registration data.
 */
export const RegisterSchema = yup.object({
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
