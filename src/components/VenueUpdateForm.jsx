import { useEffect, useState } from "react";
import { updateVenue } from "../api/updateVenue";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueDefaultValues } from "../constants"; // Import default values
import { validateAndFilterVenueImages } from "../utils";
import PropTypes from "prop-types";
import { VenueSchema } from "../schemas";
import { VenueForm } from "./index";
import { FormSuccessMsg } from "./common";

/**
 * VenueUpdateForm Component
 *
 * This component renders a form for updating an existing venue. It uses shared utilities,
 * schema validation, and a reusable form component to ensure consistency and maintainability.
 *
 * Props:
 * @param {Object} venue - The venue object containing the current details of the venue to be updated.
 * @param {Function} onClose - Callback function to close the form or modal after the venue is updated.
 * @param {Function} onUpdate - Callback function to refresh the parent component or venue list.
 *
 * @returns {JSX.Element} The rendered VenueUpdateForm component.
 */
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

  /**
   * Populates the form with the current venue details when the `venue` prop changes.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (venue) {
      reset(venue); // Populate the form with venueDetails
    }
  }, [venue, reset]);

  /**
   * Handles form submission.
   *
   * This function validates the form data, filters image URLs, and sends the data
   * to the API to update the venue. It also handles success and error states.
   *
   * @param {Object} data - The form data submitted by the user.
   * @returns {Promise<void>}
   */
  const onSubmit = async (data) => {
    console.log("Form data before processing:", data);

    // Validate and filter image URLs
    const filteredMedia = await validateAndFilterVenueImages(
      data.media,
      setError,
    );
    if (!filteredMedia) return; // Stop submission if validation fails

    data.media = filteredMedia;

    try {
      const updatedVenue = await updateVenue(venue.id, data);
      console.log("Venue updated successfully:", updatedVenue);
      setIsUpdated(true);
      onUpdate();
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
        <FormSuccessMsg
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
