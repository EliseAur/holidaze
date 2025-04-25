import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FacilityIconRounded from "./common/FacilitiesIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faUserGroup,
  faSackDollar,
  faCalendarDay,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import {
  differenceInDays,
  eachDayOfInterval,
  parseISO,
  isSameDay,
  isToday,
  format,
} from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext
import { deleteVenue } from "../api";
import { ModalMessage } from "./index";
import placeholderImage from "../images/placeholder-profile-img.jpg";
registerLocale("en-GB", enGB);

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
  // Create a state to track the validity of each image.
  const [imageValidity, setImageValidity] = useState(
    media.map(() => true), // Initialize all images as valid
  );

  // Update the onError handler to mark individual images as invalid.
  const handleImageError = (index) => {
    setImageValidity((prev) => {
      const updatedValidity = [...prev];
      updatedValidity[index] = false; // Mark the specific image as invalid
      return updatedValidity;
    });
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setModalMessage("");
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

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

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = description.split(" ").slice(0, 50).join(" ");
  const isTruncated = description.split(" ").length > 50;

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
      {media.length > 1 ? (
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          className="mt-3 shadow-sm"
        >
          {media.map((image, index) => (
            <div key={index} className="">
              {imageValidity[index] ? (
                <img
                  src={image.url}
                  alt={image.alt || "Venue image"}
                  className="w-full h-60 sm:h-72 object-cover rounded-sm"
                  onError={() => handleImageError(index)} // Handle image load failure
                />
              ) : (
                <div className="w-full h-60 sm:h-72 bg-gray-300 flex items-center justify-center rounded-sm">
                  <span className="text-gray-700">No image found</span>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      ) : media.length === 1 ? (
        imageValidity[0] ? (
          <img
            src={media[0].url}
            alt={media[0].alt || "Venue image"}
            className="mt-3 w-full h-60 sm:h-72 object-cover rounded-sm"
            onError={() => handleImageError(0)} // Handle image load failure
          />
        ) : (
          <div className="mt-3 w-full h-60 sm:h-72 bg-gray-300 flex items-center justify-center rounded-sm">
            <span className="text-gray-700">No image found</span>
          </div>
        )
      ) : (
        <div className="mt-3 w-full h-60 sm:h-72 bg-gray-300 flex items-center justify-center rounded-sm">
          <span className="text-gray-700 text-light">No image available</span>
        </div>
      )}

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
      <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
        <div className="flex justify-between flex-grow">
          <h1 className="text-lg sm:text-2xl italic font-black break-words mb-3 overflow-hidden ">
            {name}
          </h1>
          <div className="hidden sm:flex mt-1 flex-row">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 text-lg"
            />
            <span className="ml-1 font-bold text-sm">{rating}</span>
          </div>
        </div>

        <div className="flex justify-between -mt-2">
          <div className="mt-auto">
            <span>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-red-500 text-lg mr-1"
              />
            </span>
            {location.city || location.country ? (
              <span className="font-bold text-sm">
                {location.city ? location.city : ""}
                {location.city && location.country ? ", " : ""}
                {location.country ? location.country : ""}
              </span>
            ) : (
              <span className="font-bold text-sm">
                Contact host about location
              </span>
            )}
          </div>
          <div className="sm:hidden">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 text-lg"
            />
            <span className="ml-1 font-bold text-sm">{rating}</span>
          </div>
          <div className="hidden sm:block">
            <FontAwesomeIcon icon={faSackDollar} className="mr-1 mt-3" />
            <span className="font-bold text-sm">
              {price}
              $/night
            </span>
          </div>
        </div>
        <div className="sm:hidden">
          <FontAwesomeIcon icon={faSackDollar} className="mr-1 mt-3" />
          <span className="font-bold text-sm">
            {price}
            $/night
          </span>
        </div>
      </div>
      <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
        <h2 className="text-md sm:text-lg font-black break-words">
          Description
        </h2>
        <p className="break-words text-sm sm:text-base">
          {showFullDescription ? description : `${truncatedDescription}...`}
        </p>
        {isTruncated && (
          <button
            onClick={toggleDescription}
            className="font-bold mt-2 underline text-sm hover:decoration-2 hover:cursor-pointer"
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div>
        {/* Features and Contact flex-box */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch">
          <div className="min-w-[258.3px] w-full bg-lightBeige rounded-sm shadow-sm p-5 mt-3 sm:mr-1">
            <h2 className="text-md sm:text-lg font-black">Facilities</h2>
            <div className="flex flex-row mt-1">
              <div className="bg-black rounded-full w-[24px] h-[24px] flex items-center justify-center">
                <div>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="text-lightBeige mb-0.5 text-xs"
                  />
                </div>
              </div>
              <span className="ml-1">Max {maxGuests} guests</span>
            </div>
            <div className="flex flex-row mt-1">
              <FacilityIconRounded available={meta.wifi} type="wifi" />
              <span className="ml-1">
                {meta.wifi ? "Wifi available" : "No wifi in the venue"}
              </span>
            </div>
            <div className="flex flex-row mt-1">
              <FacilityIconRounded available={meta.parking} type="parking" />
              <span className="ml-1">
                {meta.parking ? "Parking available" : "Parking not available"}
              </span>
            </div>
            <div className="flex flex-row mt-1">
              <FacilityIconRounded
                available={meta.breakfast}
                type="breakfast"
              />
              <span className="ml-1">
                {meta.breakfast
                  ? "Breakfast included"
                  : "Breakfast not included"}
              </span>
            </div>
            <div className="flex flex-row mt-1">
              <FacilityIconRounded available={meta.pets} type="pets" />
              <span className="ml-1">
                {meta.pets ? "Pets allowed" : "Pets not allowed"}
              </span>
            </div>
          </div>
          <div className="min-w-[258.3px] w-full bg-lightBeige rounded-sm shadow-sm p-5 mt-3 sm:ml-1">
            <h2 className="text-md sm:text-lg font-black">Contact host</h2>
            <div>
              <img
                src={
                  owner.avatar &&
                  owner.avatar.url.includes(
                    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
                  )
                    ? placeholderImage
                    : owner.avatar.url
                }
                alt={
                  owner.avatar &&
                  owner.avatar.url.includes(
                    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
                  )
                    ? "Profile placeholder image"
                    : owner.avatar.alt || "Profile placeholder image"
                }
                className="w-15 h-15 rounded-full mt-3 border-1 border-white shadow-sm"
              />
            </div>
            <p className="mt-3 font-bold">{owner.name}</p>
            <p>{owner.email}</p>
          </div>
        </div>
        {/* Datepicker and select/buttons flexbox */}
        <div className="flex flex-col sm:flex-row justify-between bg-lightBeige rounded-sm shadow-sm mt-3 mb-5 p-5 pb-8">
          {userName === owner.name ? (
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
                          <FontAwesomeIcon
                            icon={faCalendarDay}
                            className="mr-1"
                          />{" "}
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
                          <FontAwesomeIcon
                            icon={faSackDollar}
                            className="mr-1"
                          />
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
          ) : (
            <div className="h-full min-w-[258.3px]">
              <h2 className="text-md sm:text-lg font-black">Book</h2>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                locale="en-GB"
                minDate={new Date()} // Prevent booking dates in the past
                excludeDates={bookedDates} // Disable booked dates
                dayClassName={getDayClassName} // Apply custom CSS class to booked dates
              />
              <div className="flex text-xs ml-1">
                <div className="flex items-center mr-2">
                  <span className="w-4 h-4 bg-white inline-block rounded-sm border-datepicker mr-1"></span>
                  <span>Available</span>
                </div>
                <div className="flex items-center mr-2">
                  <span className="w-4 h-4 bg-darkBeige inline-block rounded-sm border-datepicker mr-1"></span>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-300 inline-block rounded-sm border-datepicker mr-1"></span>
                  <span>Selected</span>
                </div>
              </div>
            </div>
          )}
          {userName === owner.name ? null : (
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
                  {startDate &&
                  endDate &&
                  differenceInDays(endDate, startDate) > 0
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
