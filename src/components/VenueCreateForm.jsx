import { useState } from "react";
import { createVenue } from "../api/createVenue";
import { SwitchField } from "./index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";

const VenueCreateSchema = yup.object({
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
    adress: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
  }),
});

export default function VenueCreateForm({ onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VenueCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      media: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
      price: 0,
      maxGuests: 0,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
      },
    },
    mode: "onChange",
  });

  const [isCreated, setIsCreated] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form data before processing:", data); // Debugging: Log form data

    // Check if the first image URL is empty and set an error if it is
    if (!data.media[0].url) {
      setError("media.0.url", {
        type: "manual",
        message: "URL is required for the first image.",
      });
      return;
    }

    // Remove URLs for images 2, 3, and 4 if they are empty or invalid
    data.media = data.media.filter((media, index) => {
      if (index > 0 && (!media.url || media.url === "")) {
        return false;
      }
      return true;
    });

    try {
      const newVenue = await createVenue(data);
      console.log("Venue created successfully:", newVenue);
      setIsCreated(true); // Set the created state to true
      onUpdate(); // Call the callback function to update the account page
    } catch (error) {
      console.error("Error creating venue:", error);

      const errorMessage = error.message;

      const imageUrl = error.imageUrl;

      if (errorMessage.includes("Image is not accessible")) {
        if (imageUrl) {
          const imageIndex = data.media.findIndex(
            (media) => media.url === imageUrl,
          );
          if (imageIndex !== -1) {
            setError(`media.${imageIndex}.url`, {
              type: "manual",
              message:
                "Image is not accessible, please double check the image address",
            });
          } else {
            setError("form", {
              type: "manual",
              message:
                "Image is not accessible, please double check the image address",
            });
          }
        } else {
          setError("form", {
            type: "manual",
            message:
              "Image is not accessible, please double check the image address",
          });
        }
      } else if (errorMessage.includes("Failed to create venue")) {
        if (imageUrl) {
          const imageIndex = data.media.findIndex(
            (media) => media.url === imageUrl,
          );
          if (imageIndex !== -1) {
            setError(`media.${imageIndex}.url`, {
              type: "manual",
              message: "Please double check the image address.",
            });
          } else {
            setError("form", {
              type: "manual",
              message:
                "Failed to create venue. Please check the provided data.",
            });
          }
        } else {
          setError("form", {
            type: "manual",
            message: "Failed to create venue. Please check the provided data.",
          });
        }
      } else {
        setError("form", {
          type: "manual",
          message: "An unknown error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      {isCreated ? (
        <div className="text-center p-5 pb-8">
          <h2 className="text-2xl font-black text-black mb-3">
            Venue created successfully!
          </h2>
          <p className="text-md text-black font-bold">
            Your venue has been created. You can close this window.
          </p>
          <button
            onClick={onClose}
            className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 sm:p-5 font-bold text-sm"
        >
          <h2 className="text-2xl font-black text-black mb-3">
            Create a venue
          </h2>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-black font-bold"
            >
              Name:
            </label>
            <input
              {...register("name")}
              id="name"
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
              placeholder="Venue name"
            />
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.name?.message}
            </p>
          </div>
          <div className="mt-2">
            <label
              htmlFor="description"
              className="block text-sm text-black font-bold"
            >
              Description:
            </label>
            <textarea
              {...register("description")}
              id="description"
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none h-30"
              placeholder="Venue description"
            />
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.description?.message}
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black">Images</h3>
            <p>* You need to add at least one image</p>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="mt-2">
                <label
                  htmlFor={`media-url-${index}`}
                  className="block text-sm text-black font-bold"
                >
                  {index + 1} Image
                </label>
                <input
                  {...register(`media.${index}.url`)}
                  id={`media-url-${index}`}
                  type="url"
                  className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                  placeholder={`https://valid-url`}
                />
                <p className="text-red-600 text-sm font-bold m-1">
                  {errors.media?.[index]?.url?.message}
                </p>
              </div>
            ))}
          </div>
          <div className="flex mt-3">
            <div className="mt-2 mr-2 flex-grow">
              <label
                htmlFor="price"
                className="block text-sm text-black font-bold"
              >
                Price/night in USD:
              </label>
              <input
                {...register("price")}
                id="price"
                type="number"
                className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                placeholder="Price per night"
              />
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.price?.message}
              </p>
            </div>
            <div className="mt-2 flex-grow">
              <label
                htmlFor="maxGuests"
                className="block text-sm text-black font-bold"
              >
                Max Guests:
              </label>
              <input
                {...register("maxGuests")}
                id="maxGuests"
                type="number"
                className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                placeholder="Maximum number of guests"
              />
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.maxGuests?.message}
              </p>
            </div>
          </div>
          <div className="flex mt-3">
            <div className="mt-2 flex-grow">
              <label
                htmlFor="wifi"
                className="block text-sm text-black font-bold"
              >
                Wifi
              </label>
              <Controller
                name="meta.wifi"
                control={control}
                render={({ field }) => (
                  <SwitchField
                    label=""
                    checked={field.value}
                    onChange={field.onChange}
                    textColor="text-black"
                    textShadow=""
                  />
                )}
              />
            </div>
            <div className="mt-2 flex-grow">
              <label
                htmlFor="parking"
                className="block text-sm text-black font-bold"
              >
                Parking
              </label>
              <Controller
                name="meta.parking"
                control={control}
                render={({ field }) => (
                  <SwitchField
                    label=""
                    checked={field.value}
                    onChange={field.onChange}
                    textColor="text-black"
                    textShadow=""
                  />
                )}
              />
            </div>
            <div className="mt-2 flex-grow">
              <label
                htmlFor="breakfast"
                className="block text-sm text-black font-bold"
              >
                Breakfast
              </label>
              <Controller
                name="meta.breakfast"
                control={control}
                render={({ field }) => (
                  <SwitchField
                    checked={field.value}
                    onChange={field.onChange}
                    textColor="text-black"
                    textShadow=""
                  />
                )}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="pets"
                className="block text-sm text-black font-bold"
              >
                Pets
              </label>
              <Controller
                name="meta.pets"
                control={control}
                render={({ field }) => (
                  <SwitchField
                    checked={field.value}
                    onChange={field.onChange}
                    textColor="text-black"
                    textShadow=""
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="address"
              className="block text-sm text-black font-bold"
            >
              Address:
            </label>
            <input
              {...register("location.address")}
              id="address"
              type="text"
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
              placeholder="Address"
            />
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.location?.address?.message}
            </p>
          </div>
          <div className="flex">
            <div className="mt-2 mr-2 flex-grow">
              <label
                htmlFor="city"
                className="block text-sm text-black font-bold"
              >
                City:
              </label>
              <input
                {...register("location.city")}
                id="city"
                type="text"
                className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                placeholder="City"
              />
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.location?.city?.message}
              </p>
            </div>
            <div className="mt-2 flex-grow">
              <label
                htmlFor="zip"
                className="block text-sm text-black font-bold"
              >
                Zip Code:
              </label>
              <input
                {...register("location.zip")}
                id="zip"
                type="text"
                className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                placeholder="Zip Code"
              />
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.location?.zip?.message}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="mt-2 mr-2 flex-grow">
              <label
                htmlFor="country"
                className="block text-sm text-black font-bold"
              >
                Country:
              </label>
              <input
                {...register("location.country")}
                id="country"
                type="text"
                className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                placeholder="Country"
              />
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.location?.country?.message}
              </p>
            </div>
            <div className="mt-2 flex-grow">
              <label
                htmlFor="continent"
                className="block text-sm text-black font-bold"
              >
                Continent:
              </label>
              <input
                {...register("location.continent")}
                id="continent"
                type="text"
                className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
                placeholder="Continent"
              />
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.location?.continent?.message}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
          >
            Create Venue
          </button>
          {errors.form && (
            <div className="mt-3 border border-red-600 bg-red-100 p-2 rounded">
              <p className="text-red-600 text-sm font-bold m-1">
                {errors.form.message}
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

VenueCreateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
