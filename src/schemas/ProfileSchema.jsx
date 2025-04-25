import * as yup from "yup";

/**
 * ProfileSchema
 *
 * A `yup` schema for validating profile update data.
 */
export const ProfileSchema = yup.object({
  bio: yup
    .string()
    .max(80, "Bio must be less than 80 characters")
    .nullable()
    .notRequired(),
  avatar: yup.object({
    url: yup
      .string()
      .url("Must be a valid URL")
      .typeError("Must be a valid URL")
      .notRequired()
      .nullable(),
  }),
  banner: yup.object({
    url: yup
      .string()
      .url("Must be a valid URL")
      .typeError("Must be a valid URL")
      .notRequired()
      .nullable(),
  }),
  venueManager: yup.boolean(),
});
