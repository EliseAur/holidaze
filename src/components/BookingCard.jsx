import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { format, differenceInDays } from "date-fns";

export default function BookingCard({ booking }) {
  const [isImageValid, setIsImageValid] = useState(true);

  const handleImageError = () => {
    setIsImageValid(false); // Set the state to false if the image fails to load
  };
  const nights = differenceInDays(
    new Date(booking.dateTo),
    new Date(booking.dateFrom),
  );
  const totalPrice = booking.venue.price * nights;

  return (
    <div className="booking-card bg-lightBeige rounded-sm shadow-lg mt-2 hover:shadow-custom-dark">
      {booking.venue.media.length > 0 && isImageValid ? (
        <Link to={`/venue/${booking.venue.id}`}>
          <img
            src={booking.venue.media[0].url}
            alt={booking.venue.media[0].alt || "Venue image"}
            className="venue-image w-full h-50 sm:h-56 object-cover rounded-t-sm"
            onError={handleImageError} // Handle image load failure
          />
        </Link>
      ) : (
        <Link
          to={`/venue/${booking.venue.id}`}
          className="rounded-t-sm w-full h-40 sm:h-56 object-cover object-center cursor-pointer bg-gray-300 flex items-center justify-center"
        >
          <span className="text-gray-700">
            {booking.venue.media.length > 0 && booking.venue.media[0]?.url
              ? "No image found"
              : "No image provided"}
          </span>
        </Link>
      )}
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
