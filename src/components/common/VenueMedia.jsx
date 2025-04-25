import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * VenueCardMedia Component
 *
 * Renders the venue's media (image or placeholder) with error handling.
 *
 * Props:
 * @param {string} venueId - The ID of the venue.
 * @param {Array} media - An array of media objects containing `url` and `alt`.
 * @param {string} className - Additional CSS classes for styling.
 */
export default function VenueCardMedia({ venueId, media, className }) {
  const [isImageValid, setIsImageValid] = useState(true);

  const handleImageError = () => {
    setIsImageValid(false); // Set the state to false if the image fails to load
  };

  return (
    <>
      {media.length > 0 && isImageValid ? (
        <Link to={`/venue/${venueId}`}>
          <img
            src={media[0]?.url}
            alt={media[0]?.alt || "Venue image"}
            className={className}
            onError={handleImageError} // Handle image load failure
          />
        </Link>
      ) : (
        <Link
          to={`/venue/${venueId}`}
          className={`${className} bg-gray-300 flex items-center justify-center`}
        >
          <span className="text-gray-700">
            {media.length > 0 && media[0]?.url
              ? "No image found"
              : "No image provided"}
          </span>
        </Link>
      )}
    </>
  );
}

VenueCardMedia.propTypes = {
  venueId: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
};
