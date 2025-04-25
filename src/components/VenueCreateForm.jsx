import { useState } from "react";
import { createVenue } from "../api/createVenue";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueDefaultValues } from "../constants/"; // Import default values
import { validateAndFilterVenueImages } from "../utils";
import PropTypes from "prop-types";
import { VenueSchema } from "../schemas";
import { VenueForm } from "./index";
import { FormSuccessMsg } from "./common";

/**
 * VenueCreateForm Component
 *
 * This component renders a form for creating a new venue. It uses shared utilities,
 * schema validation, and a reusable form component to ensure consistency.
 *
 * Props:
 * @param {Function} onClose - Callback function to close the form or modal.
 * @param {Function} onUpdate - Callback function to refresh the parent component or venue list.
 *
 * @returns {JSX.Element} The rendered VenueCreateForm component.
 */
export default function VenueCreateForm({ onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VenueSchema),
    defaultValues: venueDefaultValues, // Default form values
    mode: "onChange",
  });

  const [isCreated, setIsCreated] = useState(false);

  /**
   * Handles form submission.
   *
   * This function validates the form data, filters image URLs, and sends the data
   * to the API to create a new venue. It also handles success and error states.
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
      const newVenue = await createVenue(data);
      console.log("Venue created successfully:", newVenue);
      setIsCreated(true);
      onUpdate();
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
        <FormSuccessMsg
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
