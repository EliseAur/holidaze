import PropTypes from "prop-types";

/**
 * VenueSuccessMsg Component
 *
 * This component displays a success message after a venue is successfully created or updated.
 * It includes a title, a message, and a button to close the success message.
 *
 * Props:
 * @param {string} title - The title of the success message.
 * @param {string} message - The body of the success message.
 * @param {Function} onClose - Callback function to close the success message.
 *
 * @returns {JSX.Element} The rendered VenueSuccessMsg component.
 */
export default function VenueSuccessMsg({ title, message, onClose }) {
  return (
    <div className="text-center p-5 pb-8">
      <h2 className="text-2xl font-black text-black mb-3">{title}</h2>
      <p className="text-md text-black font-bold">{message}</p>
      <button
        onClick={onClose}
        className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
      >
        Close
      </button>
    </div>
  );
}

VenueSuccessMsg.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
