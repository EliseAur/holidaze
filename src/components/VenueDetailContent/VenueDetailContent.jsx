import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { eachDayOfInterval, parseISO, isSameDay, isToday } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Import your AuthContext
import { deleteVenue } from "../../api";
import { ModalMessage } from "../index";
import {
  VenueMediaCarousel,
  VenueHeader,
  VenueDescription,
  VenueFacilities,
  VenueContactHost,
  UpcomingBookings,
  PickDatesSection,
  BookVenueSection,
} from "./index";
registerLocale("en-GB", enGB);

/**
 * VenueDetailContent component displays detailed information about a venue,
 * including media, description, facilities, bookings, and booking options.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.venue - The venue details.
 * @param {string} props.venue.id - The unique ID of the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Array<Object>} props.venue.media - An array of media objects for the venue.
 * @param {string} props.venue.description - The description of the venue.
 * @param {number} props.venue.price - The price per night for the venue.
 * @param {number} props.venue.rating - The rating of the venue.
 * @param {number} props.venue.maxGuests - The maximum number of guests allowed.
 * @param {Object} props.venue.meta - Metadata about the venue (e.g., WiFi, parking).
 * @param {Object} props.venue.location - The location of the venue.
 * @param {Object} props.venue.owner - The owner of the venue.
 * @param {Array<Object>} props.venue.bookings - An array of bookings for the venue.
 * @param {Date} props.startDate - The selected start date for booking.
 * @param {Date} [props.endDate] - The selected end date for booking.
 * @param {number} props.guests - The number of guests selected for booking.
 * @param {number} props.totalPrice - The total price for the selected booking.
 * @param {Function} props.handleDateChange - Function to handle changes in the selected dates.
 * @param {Function} props.handleBooking - Function to handle the booking process.
 * @param {Function} props.setGuests - Function to set the number of guests.
 * @param {Function} props.openVenueModal - Function to open the venue update modal.
 * @returns {JSX.Element} The rendered VenueDetailContent component.
 */
export default function VenueDetailContent({
  venue,
  startDate,
  endDate,
  guests,
  totalPrice,
  handleDateChange,
  handleBooking,
  setGuests,
  openVenueModal,
}) {
  const navigate = useNavigate();
  const {
    id,
    name,
    media,
    description,
    price,
    rating,
    maxGuests,
    meta,
    location,
    owner,
    bookings,
  } = venue;

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setModalMessage("");
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  /**
   * Handles the deletion of a venue.
   * - Checks if the user is authorized to delete the venue.
   * - Ensures the venue has no active bookings before allowing deletion.
   * - Opens a confirmation modal if deletion is allowed.
   *
   * @async
   * @returns {Promise<void>} Resolves when the deletion process is complete.
   */
  const handleDeleteVenue = async () => {
    console.log("Attempting to delete venue with ID:", id);

    if (userName !== venue.owner.name) {
      setModalMessage("You are not authorized to delete this venue.");
      setIsMessageModalOpen(true);
      return;
    }

    // Check if the venue has bookings
    if (venue.bookings.length > 0) {
      setModalMessage(
        "This venue has active bookings and cannot be deleted. Please contact the booking customers to cancel their bookings first.",
      );
      setIsMessageModalOpen(true);
      return;
    }

    setIsConfirmModalOpen(true); // Open the confirmation modal
  };

  /**
   * Confirms and deletes the venue after user confirmation.
   * - Closes the confirmation modal.
   * - Deletes the venue via an API call.
   * - Displays success or error messages based on the outcome.
   *
   * @async
   * @returns {Promise<void>} Resolves when the deletion process is complete.
   */
  const confirmDeleteVenue = async () => {
    setIsConfirmModalOpen(false); // Close the confirmation modal
    try {
      await deleteVenue(id);
      setModalMessage(
        "Venue deleted successfully! Please wait to be redirected to your updated account page.",
      );
      setIsMessageModalOpen(true);
      setTimeout(() => {
        navigate("/account");
      }, 2000);
    } catch (error) {
      console.error(`Failed to delete venue with ID ${id}:`, error);
      setModalMessage("Failed to delete the venue. Please try again.");
      setIsMessageModalOpen(true);
    }
  };

  const { isLoggedIn } = useContext(AuthContext); // Use context to get authentication status
  const userName = localStorage.getItem("userName");

  // Extract booked dates
  const bookedDates = bookings.flatMap((booking) =>
    eachDayOfInterval({
      start: parseISO(booking.dateFrom),
      end: parseISO(booking.dateTo),
    }),
  );

  // Function to apply CSS class to booked dates and current date
  const getDayClassName = (date) => {
    const classes = [];
    if (bookedDates.some((bookedDate) => isSameDay(bookedDate, date))) {
      classes.push("bg-darkBeige", "rounded-sm", "text-white", "booked-date");
    }
    if (isToday(date)) {
      classes.push("font-bold", "text-black");
    }
    return classes.join(" ");
  };

  return (
    <div className="mx-auto p-4 max-w-[600px]">
      <VenueMediaCarousel media={media} />
      {userName === owner.name && (
        <div className="flex p-3 mt-3">
          <button
            onClick={openVenueModal}
            className="bg-black text-lightBeige text-xs font-bold px-4 py-2 rounded hover:bg-gray-900 w-full mr-2 "
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-lightBeige mr-1"
            />
            Update Venue
          </button>
          <button
            onClick={handleDeleteVenue}
            className="bg-black text-lightBeige text-xs font-bold px-4 py-2 rounded hover:bg-gray-900 w-full "
          >
            <FontAwesomeIcon icon={faTrash} className="text-lightBeige mr-1" />
            Delete Venue
          </button>
        </div>
      )}
      {/* Confirmation Modal */}
      <ModalMessage
        isOpen={isConfirmModalOpen}
        message="Are you sure you want to delete this venue?"
        onClose={closeConfirmModal}
        onConfirm={confirmDeleteVenue}
        showConfirmButtons={true}
      />

      {/* Message Modal */}
      <ModalMessage
        isOpen={isMessageModalOpen}
        message={modalMessage}
        onClose={closeMessageModal}
      />

      {/* Title, location, price, and rating */}
      <VenueHeader
        name={name}
        rating={rating}
        location={location}
        price={price}
      />

      <VenueDescription description={description} />
      <div>
        {/* Facilities and Contact flex-box */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch">
          <VenueFacilities maxGuests={maxGuests} meta={meta} />
          <VenueContactHost owner={owner} />
        </div>

        {/* Booking section / Upcoming bookings section if owner */}
        <div className="flex flex-col sm:flex-row justify-between bg-lightBeige rounded-sm shadow-sm mt-3 mb-5 p-5 pb-8">
          {userName === owner.name ? (
            <UpcomingBookings bookings={bookings} price={price} />
          ) : (
            <PickDatesSection
              startDate={startDate}
              endDate={endDate}
              handleDateChange={handleDateChange}
              bookedDates={bookedDates}
              getDayClassName={getDayClassName}
            />
          )}
          {userName === owner.name ? null : (
            <BookVenueSection
              price={price}
              maxGuests={maxGuests}
              guests={guests}
              setGuests={setGuests}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              isLoggedIn={isLoggedIn}
              handleBooking={handleBooking}
            />
          )}
        </div>
      </div>
    </div>
  );
}

VenueDetailContent.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }),
    ).isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      parking: PropTypes.bool,
      breakfast: PropTypes.bool,
      pets: PropTypes.bool,
    }).isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }).isRequired,
    }).isRequired,
    bookings: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        dateFrom: PropTypes.string.isRequired,
        dateTo: PropTypes.string.isRequired,
        customer: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  guests: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleBooking: PropTypes.func.isRequired,
  setGuests: PropTypes.func.isRequired,
  openVenueModal: PropTypes.func.isRequired,
};
