import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faStar,
  faMapMarkerAlt,
  faUserGroup,
  faSackDollar,
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
}) {
  const {
    // id,
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
      {media.length > 1 ? (
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          className="mt-3 shadow-sm"
        >
          {media.map((image, index) => (
            <div key={index} className="">
              <img
                src={image.url}
                alt={image.alt || "Venue image"}
                className="w-full h-60 sm:h-72 object-cover rounded-sm"
              />
            </div>
          ))}
        </Carousel>
      ) : media.length === 1 ? (
        <img
          src={media[0].url}
          alt={media[0].alt || "Image not found."}
          className="mt-3 w-full h-60 sm:h-72 object-cover rounded-sm"
        />
      ) : (
        <div className="mt-3 w-full h-60 sm:h-72 bg-gray-300 flex items-center justify-center rounded-sm">
          <span className="text-gray-700 text-light">No image available</span>
        </div>
      )}
      <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
        <h1 className="text-2xl font-black break-words mb-2">{name}</h1>
        <div className="flex justify-between">
          <div className="">
            <span>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-red-500 text-xl mr-1"
              />
            </span>
            <span className="font-bold">
              {location.city}, {location.country}
            </span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 text-xl"
            />
            <span className="ml-1">
              <span className="font-bold">Rating:</span> {rating}
            </span>
          </div>
        </div>
        <h2 className="text-lg font-black break-words mt-3">Description</h2>
        <p className="break-words">{description}</p>
      </div>
      <div>
        {/* Features and Contact flex-box */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch">
          <div className="min-w-[258.3px] w-full bg-lightBeige rounded-sm shadow-sm p-5 mt-3 sm:mr-1">
            <h2 className="text-lg font-black">Facilities</h2>
            <div className="flex flex-row mt-1">
              <div className="bg-black rounded-full w-[22px] h-[22px] flex items-center justify-center">
                <div>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="text-beige mb-0.5 text-xs"
                  />
                </div>
              </div>
              <span className="ml-1 text-xxs">Max {maxGuests} guests</span>
            </div>
            <div className="flex flex-row mt-1">
              <span
                className={
                  meta.wifi
                    ? "bg-black rounded-full w-[22px] h-[22px] flex items-center justify-center"
                    : "bg-darkBeige rounded-full w-[22px] h-[22px] flex items-center justify-center"
                }
              >
                <FontAwesomeIcon icon={faWifi} className="text-beige text-xs" />
              </span>
              <span className="ml-1">
                {meta.wifi ? "Wifi available" : "No wifi in the venue"}
              </span>
            </div>
            <div className="flex flex-row mt-1">
              <span
                className={
                  meta.parking
                    ? "bg-black rounded-full w-[22px] h-[22px] flex items-center justify-center"
                    : "bg-darkBeige rounded-full w-[22px] h-[22px] flex items-center justify-center"
                }
              >
                <FontAwesomeIcon
                  icon={faParking}
                  className="text-beige text-xs"
                />
              </span>
              <span className="ml-1">
                {meta.parking ? "Parking available" : "Parking not available"}
              </span>
            </div>
            <div className="flex flex-row mt-1">
              <span
                className={
                  meta.breakfast
                    ? "bg-black rounded-full w-[22px] h-[22px] flex items-center justify-center"
                    : "bg-darkBeige rounded-full w-[22px] h-[22px] flex items-center justify-center"
                }
              >
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-beige text-xs"
                />
              </span>
              <span className="ml-1">
                {meta.breakfast
                  ? "Breakfast included"
                  : "Breakfast not included"}
              </span>
            </div>
            <div className="flex flex-row mt-1">
              <span
                className={
                  meta.pets
                    ? "bg-black rounded-full w-[22px] h-[22px] flex items-center justify-center"
                    : "bg-darkBeige rounded-full w-[22px] h-[22px] flex items-center justify-center"
                }
              >
                <FontAwesomeIcon icon={faPaw} className="text-beige text-xs" />
              </span>
              <span className="ml-1">
                {meta.pets ? "Pets allowed" : "Pets not allowed"}
              </span>
            </div>
          </div>
          <div className="min-w-[258.3px] w-full bg-lightBeige rounded-sm shadow-sm p-5 mt-3 sm:ml-1">
            <h2 className="text-lg font-black">Contact host</h2>
            <div>
              <img
                src={owner.avatar.url}
                alt={owner.name}
                className="w-10 h-10 rounded-full mt-3"
              />
            </div>
            <p className="mt-3">{owner.name}</p>
            <p>{owner.email}</p>
          </div>
        </div>
        {/* Datepicker and select/buttons flexbox */}
        <div className="flex flex-col sm:flex-row justify-between bg-lightBeige rounded-sm shadow-sm mt-3 mb-5 p-5 pb-8">
          {userName === owner.name ? (
            <div className="h-full w-full">
              <h2 className="text-lg font-black">Upcoming Bookings</h2>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className=" rounded-sm shadow-sm p-4 mt-3 hover:shadow-custom-dark"
                  >
                    <p>
                      <span className="font-bold">Booking by:</span>{" "}
                      {booking.customer.name}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span>{" "}
                      {booking.customer.email}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-bold">Guests: </span>
                      {booking.guests}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-bold">Dates: </span>
                      {format(new Date(booking.dateFrom), "dd.MM.yy")} -{" "}
                      {format(new Date(booking.dateTo), "dd.MM.yy")}
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
                          className="mr-1 text-green-500"
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
              <h2 className="text-lg font-black">Book</h2>
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
                <h2 className="font-black text-lg">Summary</h2>
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
                    className="form-select block w-full bg-white px-2 py-1 rounded-sm shadow-sm  text-sm"
                  >
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                    <option value="5">More than 4 guests</option>
                  </select>
                </label>
              </div>
              <div className="mt-3">
                <p>
                  {/* <span className="font-bold">Nights: </span>
                {differenceInDays(endDate, startDate)} */}
                  <span className="font-bold">Nights: </span>
                  {startDate &&
                  endDate &&
                  differenceInDays(endDate, startDate) > 0
                    ? differenceInDays(endDate, startDate)
                    : "Invalid dates"}
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
    // id: PropTypes.string.isRequired,
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
};
