import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { VenueCardMedia } from "./common";
import FacilityIconRounded from "./common/FacilitiesIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faHeart,
  faUserGroup,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

/**
 * VenueCard Component
 *
 * This component renders a card displaying details about a venue, including its name, location,
 * price, rating, and available facilities. It also includes a favorite button and a link to view
 * or manage the venue.
 *
 * Props:
 * @param {Object} venue - The venue object containing details such as `id`, `name`, `price`, and `location`.
 * Example:
 * {
 *   id: "123",
 *   name: "Luxury Villa",
 *   price: 200,
 *   location: { city: "Oslo", country: "Norway" },
 *   rating: 4,
 *   meta: { wifi: true, pets: false },
 * }
 * @param {boolean} [isFavorite] - Indicates if the venue is marked as a favorite.
 * @param {Function} [onFavoriteClick] - Callback function triggered when the favorite button is clicked.
 * @param {boolean} [isHostedByUser] - Indicates if the venue is hosted by the current user.
 *
 * @returns {JSX.Element} The rendered VenueCard component.
 */
export default function VenueCard({
  venue,
  isFavorite,
  onFavoriteClick,
  isHostedByUser,
}) {
  return (
    <div className="bg-lightBeige rounded-sm shadow-lg relative hover:shadow-custom-dark">
      <VenueCardMedia
        venueId={venue.id}
        media={venue.media}
        className="rounded-t-sm w-full h-50 sm:h-56 object-cover object-center cursor-pointer"
      />
      <button
        className={`absolute top-2 right-2 text-2xl text-lightBeige text-shadow hover:scale-110 transform transition-transform duration-200 cursor-pointer ${isFavorite ? "text-lightGreen hover:none" : ""}`}
        title="Add to favorites"
        onClick={() => onFavoriteClick(venue.id)}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="p-3 sm:p-2 sm:pt-1 md:px-3">
        <Link to={`/venue/${venue.id}`}>
          <h2 className="px-2 text-lg italic sm:text-lg md:text-xl font-black underline hover:underline hover:decoration-2 truncate p-1 cursor-pointer">
            {venue.name ? venue.name : "Venue name"}
          </h2>
        </Link>
        <div
          className="px-2 text-sm flex-col sm:flex-row sm:flex-grow flex sm:justify-between p-1"
          title={`${venue.location.country} - ${venue.location.city}`}
        >
          <span className="flex-grow truncate">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-black mr-1"
            />
            {venue.location.city || venue.location.country ? (
              <span className="font-bold text-sm">
                {venue.location.city ? venue.location.city : ""}
                {venue.location.city && venue.location.country ? ", " : ""}
                {venue.location.country ? venue.location.country : ""}
              </span>
            ) : (
              <span className="font-bold text-sm">Location not set</span>
            )}
          </span>
        </div>
        <div className="px-2 py-1 text-sm flex-grow flex justify-between">
          <div className="flex-grow ">
            <span className="font-bold">
              <FontAwesomeIcon icon={faSackDollar} className="mr-1 text-sm" />
              {venue.price} USD
            </span>
          </div>
          <span className="flex-grow text-right font-bold">
            <FontAwesomeIcon
              icon={faStar}
              className="text-black mr-0.5 text-sm"
            />
            <span>{venue.rating.toFixed(0)}</span>
          </span>
        </div>
        <div className="px-2 py-2 text-sm flex w-full justify-between  items-center">
          <div className=" flex flex-grow max-w-[121px]  justify-between space-x-0 sm:space-x-2 text-md sm:text-md">
            <FacilityIconRounded available={venue.meta.wifi} type="wifi" />
            <FacilityIconRounded available={venue.meta.pets} type="pets" />
            <FacilityIconRounded
              available={venue.meta.breakfast}
              type="breakfast"
            />
            <FacilityIconRounded
              available={venue.meta.parking}
              type="parking"
            />
          </div>
          <div className="flex-grow text-right">
            <span className="font-bold">
              <FontAwesomeIcon icon={faUserGroup} className="mr-0.5 text-sm" />
              {venue.maxGuests}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between text-center space-x-2">
          <div className="space-x-3 flex flex-grow justify-between text-xl p-1">
            <Link
              to={`/venue/${venue.id}`}
              className="text-sm bg-lightGreen text-black font-bold py-1 px-4 rounded-sm shadow-custom-dark hover:bg-darkGreen w-full text-center"
            >
              {isHostedByUser ? "Manage Venue" : "View"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
    ),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      pets: PropTypes.bool,
      breakfast: PropTypes.bool,
      parking: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteClick: PropTypes.func,
  isHostedByUser: PropTypes.bool,
};
