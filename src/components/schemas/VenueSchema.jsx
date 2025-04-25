import * as yup from "yup";

/**
 * VenueSchema
 *
 * A `yup` schema for validating venue data.
 * Ensures all required fields are present and meet validation criteria.
 *
 * @returns {yup.ObjectSchema} A schema object for validating venue data.
 */
export const VenueSchema = yup.object({
  name: yup.string().min(6, "Name must be more than 6 characters").required(),
  description: yup
    .string()
    .min(20, "Description must be more than 20 characters")
    .required(),
  media: yup.array().of(
    yup.lazy((_, { index }) => {
      if (index === 0) {
        return yup.object({
          url: yup
            .string()
            .url("Must be a valid URL")
            .required("URL is required")
            .typeError("Must be a valid URL"),
        });
      } else {
        return yup.object({
          url: yup
            .string()
            .url("Must be a valid URL")
            .nullable()
            .notRequired()
            .typeError("Must be a valid URL"),
        });
      }
    }),
  ),
  price: yup
    .number()
    .min(1, "Price must be at least 1")
    .max(10000, "Price must be less than 10 000")
    .required("You must enter a price per night")
    .typeError("Price must be a number"),
  maxGuests: yup
    .number()
    .min(1, "Must be at least 1")
    .max(100, "Must be less than 100")
    .required("You must enter the maximum number of guests")
    .typeError("Must be a number"),
  meta: yup.object({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
  }),
});
