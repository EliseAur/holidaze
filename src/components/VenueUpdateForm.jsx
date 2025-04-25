import { useEffect, useState } from "react";
import { updateVenue } from "../api/updateVenue";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueDefaultValues } from "../constants/venueDefaultvalues"; // Import default values
import { validateAndFilterVenueImages } from "../utils";
import PropTypes from "prop-types";
import { VenueSchema } from "./schemas";
import { VenueForm } from "./index";
import { VenueSuccessMsg } from "./common";

export default function VenueUpdateForm({ venue, onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VenueSchema),
    defaultValues: venueDefaultValues, // Use default values
    mode: "onChange",
  });

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (venue) {
      reset(venue); // Populate the form with venueDetails
    }
  }, [venue, reset]);

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
      const updatedVenue = await updateVenue(venue.id, data);
      console.log("Venue updated successfully:", updatedVenue);
      setIsUpdated(true);
      onUpdate(); // Call the callback function to update the account page
    } catch (error) {
      console.error("Error updating venue:", error);

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
      {isUpdated ? (
        <VenueSuccessMsg
          title="Venue updated successfully!"
          message="Your venue has been updated. You can close this window."
          onClose={onClose}
        />
      ) : (
        <VenueForm
          defaultValues={{}}
          onSubmit={handleSubmit(onSubmit)}
          formTitle="Update Venue"
          submitButtonLabel="Update Venue"
          errors={errors}
          control={control}
          register={register}
        />
      )}
    </div>
  );
}

// PropTypes for validation
VenueUpdateForm.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ),
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    meta: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
