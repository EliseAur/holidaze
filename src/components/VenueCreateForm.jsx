import { useState } from "react";
import { createVenue } from "../api/createVenue";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueDefaultValues } from "../constants/venueDefaultvalues"; // Import default values
import { validateAndFilterVenueImages } from "../utils";
import PropTypes from "prop-types";
import { VenueSchema } from "./schemas";
import { VenueForm } from "./index";
import { VenueSuccessMsg } from "./common";

export default function VenueCreateForm({ onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VenueSchema),
    defaultValues: venueDefaultValues, // Use default values
    mode: "onChange",
  });

  const [isCreated, setIsCreated] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form data before processing:", data); // Debugging: Log form data

    // Use the utility function to validate and filter images
    const filteredMedia = await validateAndFilterVenueImages(
      data.media,
      setError,
    );
    if (!filteredMedia) return; // Stop submission if validation fails

    data.media = filteredMedia; // Update the media array with filtered results

    try {
      const newVenue = await createVenue(data);
      console.log("Venue created successfully:", newVenue);
      setIsCreated(true); // Set the created state to true
      onUpdate(); // Call the callback function to update the account page
    } catch (error) {
      console.error("Error creating venue:", error);

      // Handle generic form errors
      setError("form", {
        type: "manual",
        message:
          "An unknown error occurred. Please check the provided data and try again.",
      });
    }
  };

  return (
    <div>
      {isCreated ? (
        <VenueSuccessMsg
          title="Venue created successfully!"
          message="Your venue has been created. You can close this window."
          onClose={onClose}
        />
      ) : (
        <VenueForm
          defaultValues={{}}
          onSubmit={handleSubmit(onSubmit)}
          formTitle="Create Venue"
          submitButtonLabel="Create Venue"
          errors={errors}
          control={control}
          register={register}
        />
      )}
    </div>
  );
}

VenueCreateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
