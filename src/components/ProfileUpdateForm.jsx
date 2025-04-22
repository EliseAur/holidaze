import { useState, useEffect } from "react";
import { updateProfile } from "../api/updateProfile";
import { fetchProfile } from "../api/fetchProfile";
import { isValidImageUrl } from "../utils";
import { SwitchField } from "./index";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";

const ProfileUpdateSchema = yup.object({
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

export default function ProfileUpdateForm({ onClose, onUpdate }) {
  const [profile, setProfile] = useState({
    bio: "",
    avatar: {
      url: "",
    },
    banner: {
      url: "",
    },
    venueManager: false,
    venues: [], // Add venues to the profile state
  });

  const [isUpdated, setIsUpdated] = useState(false); // Track if the profile is updated

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileUpdateSchema),
    defaultValues: profile,
    mode: "onChange",
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
        // Set form values
        Object.keys(profileData).forEach((key) => {
          setValue(key, profileData[key]);
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    getProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    // Validate image URLs
    if (!data.avatar.url) {
      setError("avatar.url", {
        type: "manual",
        message: "You must add a url for profile image",
      });
      return;
    }

    const isAvatarValid = await isValidImageUrl(data.avatar.url);
    if (!isAvatarValid) {
      setError("avatar.url", {
        type: "manual",
        message: "The URL does not point to a valid image.",
      });
      return;
    }

    // Validate banner URL
    if (!data.banner.url) {
      setError("banner.url", {
        type: "manual",
        message: "You must add a url for your banner image",
      });
      return;
    }

    const isBannerValid = await isValidImageUrl(data.banner.url);
    if (!isBannerValid) {
      setError("banner.url", {
        type: "manual",
        message: "The URL does not point to a valid image.",
      });
      return;
    }

    try {
      const updatedProfile = await updateProfile(data);
      console.log("Profile updated successfully:", updatedProfile);
      setIsUpdated(true); // Set the state to true after a successful update
      onUpdate(); // Call the callback function to update the account page
    } catch (error) {
      console.error("1) Error updating profile:", error);
      setError("form", {
        type: "manual",
        message:
          "An unknown error occurred. Please check the provided data and try again.",
      });
    }
  };

  return (
    <div>
      {isUpdated ? (
        <div className="text-center p-5 pb-8">
          <h2 className="text-2xl font-black text-black mb-3">
            Profile updated successfully!
          </h2>
          <p className="text-sm text-black">
            Your profile has been updated. You can close this window or make
            further changes.
          </p>
          <button
            onClick={onClose}
            className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 text-sm">
          <h2 className="text-2xl font-black text-black mb-3">
            Update Profile
          </h2>
          <div>
            <label htmlFor="bio" className="block text-sm text-black font-bold">
              Bio:
            </label>
            <textarea
              {...register("bio")}
              id="bio"
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none h-30"
              placeholder="Tell us about yourself"
            />
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.bio?.message}
            </p>
          </div>
          <div className="mt-2">
            <label
              htmlFor="avatar"
              className="block text-sm text-black font-bold"
            >
              Profile image
            </label>
            <input
              id="avatar"
              type="url"
              {...register("avatar.url")}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
              placeholder="Must be a valid URL"
            />
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.avatar?.url?.message}
            </p>
          </div>
          <div className="mt-2">
            <label
              htmlFor="banner"
              className="block text-sm text-black font-bold"
            >
              Profile banner/ background image
            </label>
            <input
              id="banner"
              type="url"
              {...register("banner.url")}
              className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
              placeholder="Must be a valid URL"
            />
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.banner?.url?.message}
            </p>
          </div>
          <div className="my-6 text-black">
            <label
              htmlFor="venueManager"
              className="block text-lg text-black font-black"
            >
              Register as a host?
            </label>
            <Controller
              name="venueManager"
              control={control}
              render={({ field }) => (
                <SwitchField
                  label={
                    field.value ? "I want to register as a host" : "Not yet.."
                  }
                  checked={field.value}
                  onChange={(value) => {
                    if (profile.venues.length > 0) {
                      // Prevent toggling if venues exist
                      return;
                    }
                    field.onChange(value); // Update the state if allowed
                  }}
                  textColor="text-black"
                  disabled={profile.venues.length > 0} // Disable if venues exist
                />
              )}
            />
            {profile.venues.length > 0 && (
              <p className="text-black border-1 border-red-400 rounded-sm p-2 bg-red-100 text-sm font-bold mt-2">
                You cannot unregister as a host while you have active venues.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}

// Add PropTypes for validation
ProfileUpdateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
