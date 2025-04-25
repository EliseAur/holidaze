import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { format, differenceInDays } from "date-fns";
import { VenueCardMedia } from "./common";

/**
 * BookingCard Component
 *
 * This component renders a card displaying details about a booking, including the venue name,
 * booking dates, number of nights, guests, and total price. It also includes a link to view
 * the venue details.
 *
 * Props:
 * @param {Object} booking - The booking object containing details about the booking and the venue.
 * Example:
 * {
 *   id: "456",
 *   dateFrom: "2023-06-01",
 *   dateTo: "2023-06-05",
 *   guests: 2,
 *   venue: {
 *     id: "123",
 *     name: "Luxury Villa",
 *     price: 200,
 *     media: [{ url: "https://example.com/image.jpg", alt: "Venue image" }],
 *   },
 * }
 *
 * @returns {JSX.Element} The rendered BookingCard component.
 */
export default function BookingCard({ booking }) {
  const nights = differenceInDays(
    new Date(booking.dateTo),
    new Date(booking.dateFrom),
  );
  const totalPrice = booking.venue.price * nights;

  return (
    <div className="booking-card bg-lightBeige rounded-sm shadow-lg mt-2 hover:shadow-custom-dark">
      <VenueCardMedia
        venueId={booking.venue.id}
        media={booking.venue.media}
        className="venue-image w-full h-50 sm:h-56 object-cover rounded-t-sm"
      />
      <div className="p-3">
        <Link to={`/venue/${booking.venue.id}`}>
          <h4 className="xs:text-lg sm:text-xl font-black underline hover:underline hover:decoration-2 truncate">
            {booking.venue.name ? booking.venue.name : "Venue name"}
          </h4>
        </Link>
        <p className="text-sm mt-1">
          <span className="font-bold">Dates: </span>
          {format(new Date(booking.dateFrom), "dd.MM.yy")} -{" "}
          {format(new Date(booking.dateTo), "dd.MM.yy")}
        </p>
        <p className="text-sm mt-1">
          <span className="font-bold">Nights: </span>
          {nights}
        </p>
        <p className="text-sm mt-1">
          <span className="font-bold">Guests: </span>
          {booking.guests}
        </p>
        <p className="text-sm mt-1">
          <span className="font-bold">Total price: </span>
          {totalPrice}$
        </p>
        <Link
          to={`/venue/${booking.venue.id}`}
          className="text-sm bg-lightGreen text-black text-center font-bold py-1 rounded mt-2 shadow-custom-dark hover:bg-darkGreen block cursor-pointer"
        >
          Venue Details
        </Link>
      </div>
    </div>
  );
}

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    venue: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      media: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          alt: PropTypes.string,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
