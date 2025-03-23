// import { useState, useEffect } from "react";
import { createVenue } from "../api/createVenue";
// import { fetchProfile } from "../api/fetchProfile";
import { SwitchField } from "./index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const VenueCreateSchema = yup.object({
  name: yup.string().min(6, "Name must be more than 6 characters").required(),
  description: yup
    .string()
    .min(20, "Description must be more than 20 characters")
    .required(),

  media: yup.array().of(
    yup.object({
      url: yup
        .string()
        .url("Must be a valid URL")
        .required("URL is required")
        .typeError("Must be a valid URL"),
      alt: yup
        .string()
        .max(49, "Description must be less than 50 characters")
        .typeError("Description must be less than 50 characters"),
    }),
  ),
  price: yup.number().required(),
  maxGuests: yup.number().required(),
  // rating: yup.number().required(),
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
  // const [venue, setVenue] = useState({
  //   name: "",
  //   description: "",
  //   media: {
  //     url: "",
  //     alt: "",
  //   },
  //   price: 0,
  //   maxGuests: 0,
  //   rating: 0,
  //   meta: {
  //     wifi: false,
  //     parking: false,
  //     breakfast: false,
  //     pets: false,
  //   },
  //   location: {
  //     adress: "",
  //     city: "",
  //     zip: "",
  //     country: "",
  //     continent: "",
  //   },
  // });
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
      media: [
        {
          url: "",
          alt: "",
        },
      ],
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

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   // setValue,
  //   setError,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(VenueCreateSchema),
  //   defaultValues: venue,
  //   mode: "onChange",
  // });

  // useEffect(() => {
  //   async function getProfile() {
  //     try {
  //       const profileData = await fetchProfile();
  //       setProfile(profileData);
  //       // Set form values
  //       Object.keys(profileData).forEach((key) => {
  //         setValue(key, profileData[key]);
  //       });
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   }

  //   getProfile();
  // }, [setValue]);

  // const onSubmit = async (data) => {
  //   console.log("Form data:", data); // Debugging: Log form data
  //   try {
  //     const newVenue = await createVenue(data);
  //     console.log("Venue created successfully:", newVenue);
  //     onUpdate(); // Call the callback function to update the account page
  //     onClose(); // Close the modal after successful creation
  //   } catch (error) {
  //     console.error("Error creating venue:", error);
  //     if (error.message.includes("Image URL must be a valid URL")) {
  //       // if (data.avatar.url === error.message.split(": ")[1]) {
  //         // setError("media.url", {
  //         //   type: "manual",
  //         //   message:
  //         //     "Image is not accessible, please double check the image address",
  //         // });
  //         setError("media[0].url", {
  //           type: "manual",
  //           message: "Image URL must be a valid URL",
  //         });
  //       }
  //     }
  //   }
  // };

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Debugging: Log form data
    try {
      const newVenue = await createVenue(data);
      console.log("Venue created successfully:", newVenue);
      onUpdate(); // Call the callback function to update the account page
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating venue:", error);
      if (error.message.includes("Image URL must be valid URL")) {
        setError("media[0].url", {
          type: "manual",
          message: "Image URL must be a valid URL",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm text-black font-bold">
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
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Venue description"
        />
        <p className="text-red-600 text-sm font-bold m-1">
          {errors.description?.message}
        </p>
      </div>
      <div className="mt-2">
        <label
          htmlFor="media-url"
          className="block text-sm text-black font-bold"
        >
          Media URL:
        </label>
        <input
          {...register("media.0.url")}
          id="media-url"
          type="url"
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Media URL"
        />
        <p className="text-red-600 text-sm font-bold m-1">
          {errors.media?.[0]?.url?.message}
        </p>
      </div>
      <div className="mt-2">
        <label
          htmlFor="media-alt"
          className="block text-sm text-black font-bold"
        >
          Media Alt Text:
        </label>
        <input
          {...register("media.alt")}
          id="media-alt"
          type="text"
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Media Alt Text"
        />
        <p className="text-red-600 text-sm font-bold m-1">
          {errors.media?.alt?.message}
        </p>
      </div>
      <div className="mt-2">
        <label htmlFor="price" className="block text-sm text-black font-bold">
          Price:
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
      <div className="mt-2">
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
      <div className="mt-2">
        <label htmlFor="wifi" className="block text-sm text-black font-bold">
          Wifi:
        </label>
        <Controller
          name="meta.wifi"
          control={control}
          render={({ field }) => (
            <SwitchField
              label="Wifi"
              checked={field.value}
              onChange={field.onChange}
              textColor="text-black"
              textShadow=""
            />
          )}
        />
      </div>
      <div className="mt-2">
        <label htmlFor="parking" className="block text-sm text-black font-bold">
          Parking:
        </label>
        <Controller
          name="meta.parking"
          control={control}
          render={({ field }) => (
            <SwitchField
              label="Parking"
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
          htmlFor="breakfast"
          className="block text-sm text-black font-bold"
        >
          Breakfast:
        </label>
        <Controller
          name="meta.breakfast"
          control={control}
          render={({ field }) => (
            <SwitchField
              label="Breakfast"
              checked={field.value}
              onChange={field.onChange}
              textColor="text-black"
              textShadow=""
            />
          )}
        />
      </div>
      <div className="mt-2">
        <label htmlFor="pets" className="block text-sm text-black font-bold">
          Pets:
        </label>
        <Controller
          name="meta.pets"
          control={control}
          render={({ field }) => (
            <SwitchField
              label="Pets"
              checked={field.value}
              onChange={field.onChange}
              textColor="text-black"
              textShadow=""
            />
          )}
        />
      </div>
      <div className="mt-2">
        <label htmlFor="address" className="block text-sm text-black font-bold">
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
      <div className="mt-2">
        <label htmlFor="city" className="block text-sm text-black font-bold">
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
      <div className="mt-2">
        <label htmlFor="zip" className="block text-sm text-black font-bold">
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
      <div className="mt-2">
        <label htmlFor="country" className="block text-sm text-black font-bold">
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
      <div className="mt-2">
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
      <button
        type="submit"
        className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
      >
        Create Venue
      </button>
    </form>
  );
}
