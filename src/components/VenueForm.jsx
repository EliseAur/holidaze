import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { SwitchField } from "./index";

/**
 * VenueForm Component
 *
 * This reusable form component renders the layout and fields for creating or updating a venue.
 * It includes input fields for venue details such as name, description, images, price, location,
 * and metadata (e.g., wifi, parking, breakfast, pets).
 *
 * Props:
 * @param {Function} onSubmit - Callback function to handle form submission.
 * @param {string} formTitle - The title of the form (e.g., "Create Venue" or "Update Venue").
 * @param {string} submitButtonLabel - The label for the submit button (e.g., "Create Venue").
 * @param {Object} errors - Validation errors for the form fields.
 * @param {Object} control - React Hook Form's control object for managing controlled inputs.
 * @param {Function} register - React Hook Form's register function for binding inputs.
 *
 * @returns {JSX.Element} The rendered VenueForm component.
 */
export default function VenueForm({
  onSubmit,
  formTitle,
  submitButtonLabel,
  errors,
  control,
  register,
}) {
  return (
    <form onSubmit={onSubmit} className="p-3 sm:p-5 font-bold text-sm">
      <h2 className="text-2xl font-black text-black mb-3">{formTitle}</h2>
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
          <label htmlFor="price" className="block text-sm text-black font-bold">
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
          <label htmlFor="wifi" className="block text-sm text-black font-bold">
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
          <label htmlFor="pets" className="block text-sm text-black font-bold">
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
      <div className="flex">
        <div className="mt-2 mr-2 flex-grow">
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
        <div className="mt-2 flex-grow">
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
      {errors.form && (
        <>
          <hr className="mt-5" />
          <div className="mt-5 border border-red-600 bg-red-100 p-2 rounded">
            <p className="text-red-600 text-sm font-bold m-1">
              {errors.form.message}
            </p>
          </div>
        </>
      )}
      <button
        type="submit"
        className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
      >
        {submitButtonLabel}
      </button>
    </form>
  );
}

VenueForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};
