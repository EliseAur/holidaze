import { useState, useEffect } from "react";
import { updateProfile } from "../api/updateProfile";
import { fetchProfile } from "../api/fetchProfile";
import { SwitchField } from "./index";

export default function ProfileUpdateForm({ onClose, onUpdate }) {
  const [profile, setProfile] = useState({
    bio: "",
    avatar: {
      url: "",
      alt: "",
    },
    banner: {
      url: "",
      alt: "",
    },
    venueManager: false,
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "venueManager") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: checked,
      }));
    } else if (name.startsWith("avatar.") || name.startsWith("banner.")) {
      const [key, subKey] = name.split(".");
      setProfile((prevProfile) => ({
        ...prevProfile,
        [key]: {
          ...prevProfile[key],
          [subKey]: value,
        },
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(profile);
      console.log("Profile updated successfully:", updatedProfile);
      onUpdate(); // Call the callback function to update the account page
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSwitchChange = (checked) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      venueManager: checked,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-black font-bold">Bio:</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Tell us about yourself"
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm text-black font-bold">
          Profile image
        </label>
        <input
          type="url"
          name="avatar.url"
          value={profile.avatar.url}
          onChange={handleChange}
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Must be a valid URL"
        />
        {/* <p className="text-red-600 text-sm">{errors.avatar?.message}</p> */}
      </div>
      <div className="mt-2">
        <label className="block text-sm text-black font-bold">
          Profile image description
        </label>
        <input
          type="text"
          name="avatar.alt"
          value={profile.avatar.alt}
          onChange={handleChange}
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Short description of profile image"
        />
        {/* <p className="text-red-600 text-sm">{errors.avatar?.message}</p> */}
      </div>
      <div className="mt-2">
        <label className="block text-sm text-black font-bold">
          Profile banner/ background image
        </label>
        <input
          type="url"
          name="banner.url"
          value={profile.banner.url}
          onChange={handleChange}
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Must be a valid URL"
        />
        {/* <p className="text-red-600 text-sm">{errors.avatar?.message}</p> */}
      </div>
      <div className="mt-2">
        <label className="block text-sm text-black font-bold">
          Banner image description
        </label>
        <input
          type="text"
          name="banner.alt"
          value={profile.banner.alt}
          onChange={handleChange}
          className="px-2 py-1 border border-darkBeige bg-lightBeige rounded-sm shadow-custom-dark w-full focus:border-black focus:border-2 focus:ring-black focus:outline-none"
          placeholder="Short description of profile banner image"
        />
        {/* <p className="text-red-600 text-sm">{errors.avatar?.message}</p> */}
      </div>
      <div className="mt-3 text-black">
        <SwitchField
          label="I want to register as a host"
          checked={profile.venueManager}
          onChange={handleSwitchChange}
          textColor="text-black"
          textShadow=""
        />
      </div>

      <button
        type="submit"
        className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
      >
        Update Profile
      </button>
    </form>
  );
}
