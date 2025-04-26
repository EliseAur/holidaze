import * as yup from "yup";

/**
 * LoginSchema
 *
 * A `yup` schema for validating login data.
 * Ensures the email and password fields meet validation criteria.
 *
 * @returns {yup.ObjectSchema} A schema object for validating login data.
 */
export const LoginSchema = yup.object({
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
