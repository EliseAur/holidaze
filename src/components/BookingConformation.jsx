import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * BookingConfirmation component displays a confirmation message after a successful booking.
 * Includes a link to view all bookings in the user's account and a button to close the confirmation modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - Function to handle closing the confirmation modal.
 * @returns {JSX.Element} A styled confirmation message with a close button and a link to the account page.
 *
 * @example
 * <BookingConfirmation onClose={() => setShowConfirmation(false)} />
 */
export default function BookingConfirmation({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center pb-10 pt-4">
      <h1 className="text-lg sm:text-2xl font-black mb-2">
        Booking Confirmation
      </h1>
      <p className="text-md sm:text-lg mb-2">Thank you for your booking!</p>
      <Link
        to="/account"
        className=" text-black font-bold   hover:cursor-pointer underline hover:decoration-2 text-md sm:text-lg mb-4"
      >
        View all your bookings in account
      </Link>
      <button
        onClick={onClose}
        className="bg-lightGreen text-black font-bold py-2 px-4 rounded-sm hover:bg-darkGreen hover:cursor-pointer shadow-custom-dark"
      >
        Close
      </button>
    </div>
  );
}

BookingConfirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
};
