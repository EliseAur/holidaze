import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { format, differenceInDays } from "date-fns";

/**
 * UpcomingBookings component displays a list of upcoming bookings for a venue.
 * It shows details such as booking dates, customer information, number of guests,
 * nights booked, and the total revenue for the venue owner.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Array<Object>} props.bookings - An array of booking objects for the venue.
 * @param {string} props.bookings[].id - The unique ID of the booking.
 * @param {string} props.bookings[].dateFrom - The start date of the booking (ISO format).
 * @param {string} props.bookings[].dateTo - The end date of the booking (ISO format).
 * @param {Object} props.bookings[].customer - The customer who made the booking.
 * @param {string} props.bookings[].customer.name - The name of the customer.
 * @param {string} props.bookings[].customer.email - The email of the customer.
 * @param {number} props.bookings[].guests - The number of guests for the booking.
 * @param {number} props.price - The price per night for the venue.
 * @returns {JSX.Element} The rendered UpcomingBookings component.
 */
export default function UpcomingBookings({ bookings, price }) {
  return (
    <div className="h-full w-full">
      <h2 className="text-md sm:text-lg font-black">
        Upcoming Bookings for this venue
      </h2>
      {bookings.length > 0 ? (
        bookings
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)) // Sort by dateFrom
          .map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-sm shadow-sm p-4 mt-3 hover:shadow-custom-dark"
            >
              <p className="text-md mt-1 font-bold">
                <span className="">
                  <FontAwesomeIcon icon={faCalendarDay} className="mr-1" />{" "}
                </span>
                {format(new Date(booking.dateFrom), "dd.MM.yy")} -{" "}
                {format(new Date(booking.dateTo), "dd.MM.yy")}
              </p>
              <p>
                <span className="text-sm font-bold">Booking by:</span>{" "}
                {booking.customer.name}
              </p>
              <p>
                <span className="text-sm font-bold">Email:</span>{" "}
                {booking.customer.email}
              </p>
              <p className="text-sm mt-1">
                <span className="font-bold">Guests: </span>
                {booking.guests}
              </p>
              <p className="text-sm mt-1">
                <span className="font-bold">Nights: </span>
                {differenceInDays(
                  new Date(booking.dateTo),
                  new Date(booking.dateFrom),
                )}
              </p>
              <p className="text-sm mt-1">
                <span className="font-bold">
                  <FontAwesomeIcon icon={faSackDollar} className="mr-1" />
                  Your Take:
                </span>{" "}
                {price *
                  differenceInDays(
                    new Date(booking.dateTo),
                    new Date(booking.dateFrom),
                  )}
                $
              </p>
            </div>
          ))
      ) : (
        <p>No upcoming bookings available.</p>
      )}
    </div>
  );
}

UpcomingBookings.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
      customer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      guests: PropTypes.number.isRequired,
    }),
  ).isRequired,
  price: PropTypes.number.isRequired,
};
