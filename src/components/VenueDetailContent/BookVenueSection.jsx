import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { differenceInDays } from "date-fns";

/**
 * BookVenueSection component displays a summary of the booking details for a venue,
 * including price per night, number of guests, total nights, and total price.
 * It also provides options to book the venue or prompts the user to log in or register.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {number} props.price - The price per night for the venue.
 * @param {number} props.maxGuests - The maximum number of guests allowed.
 * @param {number} props.guests - The number of guests selected for the booking.
 * @param {Function} props.setGuests - Function to update the number of guests.
 * @param {Date} [props.startDate] - The selected start date for the booking.
 * @param {Date} [props.endDate] - The selected end date for the booking.
 * @param {number} props.totalPrice - The total price for the booking.
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @param {Function} props.handleBooking - Function to handle the booking process.
 * @returns {JSX.Element} The rendered BookVenueSection component.
 */
export default function BookVenueSection({
  price,
  maxGuests,
  guests,
  setGuests,
  startDate,
  endDate,
  totalPrice,
  isLoggedIn,
  handleBooking,
}) {
  return (
    <div className="min-w-[258.3px] mt-5 sm:mt-0 sm:ml-6">
      <div className="">
        <h2 className="font-black text-md sm:text-lg">Summary</h2>
        <p className="mt-1 sm:mt-4">
          <span className="font-bold">Price:</span> {price}$/night
        </p>
      </div>
      <div className="mt-3 max-w-[242.3px]">
        <label className="block">
          <span className="font-bold">Guests</span>
          <select
            name="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="form-select block w-full bg-white px-2 py-1 rounded-sm shadow-sm text-sm"
          >
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i + 1 > 1 ? "s" : ""}
                {i + 1 === maxGuests ? " (max)" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3">
        <p>
          <span className="font-bold">Nights: </span>
          {startDate && endDate && differenceInDays(endDate, startDate) > 0
            ? differenceInDays(endDate, startDate)
            : "0"}
        </p>
        <p className="text-">
          <span className="font-bold">Total: </span> {totalPrice}$
        </p>
      </div>
      <div className="mt-6 max-w-[242.3px]">
        {isLoggedIn ? (
          <button
            onClick={handleBooking}
            className="bg-lightGreen text-black font-bold py-1.5 rounded-sm hover:bg-darkGreen shadow-custom-dark text-center mb-2 cursor-pointer block w-full"
          >
            Book Now
          </button>
        ) : (
          <>
            <p className="text-xs mb-1">
              Login or register to book your next stay
            </p>
            <Link
              to="/login"
              className="bg-lightGreen text-black font-bold py-1.5 rounded-sm hover:bg-darkGreen shadow-custom-dark text-center mb-2 cursor-pointer block"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-black text-white font-bold py-1.5 rounded-sm hover:bg-gray-900 shadow-custom-dark text-center cursor-pointer block"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

BookVenueSection.propTypes = {
  price: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  setGuests: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  totalPrice: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleBooking: PropTypes.func.isRequired,
};
