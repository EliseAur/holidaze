import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BookingCard } from "../index";
import { ViewMoreButtonAccount } from "../common";

/**
 * BookingSection component for displaying a list of upcoming bookings.
 * Allows users to view their bookings and toggle between showing all bookings or a limited number.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Array} props.bookingsToShow - The list of bookings to display, sliced based on screen size and `showAllBookings`.
 * @param {boolean} props.showAllBookings - A boolean indicating whether all bookings should be shown.
 * @param {Function} props.setShowAllBookings - A function to toggle the `showAllBookings` state.
 * @param {Array} props.upcomingBookings - The full list of upcoming bookings, used to calculate the total number of bookings.
 * @returns {JSX.Element} The rendered BookingSection component.
 *
 */
export default function BookingSection({
  bookingsToShow,
  showAllBookings,
  setShowAllBookings,
  upcomingBookings,
}) {
  return (
    <section
      id="bookings"
      className="py-3 max-w-[360px] sm:max-w-[1279px] px-4 mx-auto"
    >
      <h2 className="text-xl font-black">Upcoming bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
        {bookingsToShow.length > 0 ? (
          bookingsToShow.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="col-span-2">
            <p>You have no bookings yet.</p>
            <p className="">
              <span>Check out our </span>
              <Link to="/venues" className="font-bold decoration-2 underline">
                venues
              </Link>
              <span> and get your first booking today!</span>
            </p>
          </div>
        )}
      </div>
      <ViewMoreButtonAccount
        isShown={showAllBookings}
        toggleShown={() => setShowAllBookings(!showAllBookings)}
        totalItems={upcomingBookings.length}
        visibleItems={bookingsToShow.length}
        showText="View all bookings"
        hideText="Show less bookings"
      />
      <hr className="mt-6" />
    </section>
  );
}

BookingSection.propTypes = {
  bookingsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  showAllBookings: PropTypes.bool.isRequired,
  setShowAllBookings: PropTypes.func.isRequired,
  upcomingBookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
