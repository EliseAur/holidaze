import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

/**
 * VenueHeader component displays the header information of a venue,
 * including the venue name, rating, location, and price per night.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.name - The name of the venue.
 * @param {number} props.rating - The rating of the venue.
 * @param {Object} props.location - The location of the venue.
 * @param {string} [props.location.city] - The city where the venue is located.
 * @param {string} [props.location.country] - The country where the venue is located.
 * @param {number} props.price - The price per night for the venue.
 * @returns {JSX.Element} The rendered VenueHeader component.
 */
export default function VenueHeader({ name, rating, location, price }) {
  return (
    <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
      <div className="flex justify-between flex-grow">
        <h1 className="text-lg sm:text-2xl italic font-black break-words mb-3 overflow-hidden ">
          {name ? name : "Venue name"}
        </h1>
        <div className="hidden sm:flex mt-1 flex-row">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
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
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
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
  );
}

VenueHeader.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  price: PropTypes.number.isRequired,
};
