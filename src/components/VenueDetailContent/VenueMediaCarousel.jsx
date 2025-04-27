import React from "react";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";

/**
 * VenueMediaCarousel component displays a carousel of media images for a venue.
 * It handles multiple images, a single image, or no images gracefully.
 * If an image fails to load, it displays a fallback message.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Array<Object>} props.media - An array of media objects for the venue.
 * @param {string} props.media[].url - The URL of the media image.
 * @param {string} [props.media[].alt] - The alt text for the media image.
 * @returns {JSX.Element} The rendered VenueMediaCarousel component.
 */
export default function VenueMediaCarousel({ media }) {
  const [imageValidity, setImageValidity] = useState([]);

  // Reset imageValidity whenever the media prop changes
  useEffect(() => {
    setImageValidity(media.map(() => true)); // Initialize all images as valid
  }, [media]);

  const handleImageError = (index) => {
    setImageValidity((prev) => {
      const updatedValidity = [...prev];
      updatedValidity[index] = false; // Mark the specific image as invalid
      return updatedValidity;
    });
  };

  if (media.length > 1) {
    return (
      <Carousel
        key={media.map((image) => image.url).join(",")} // Use media URLs as a unique key
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        className="shadow-sm"
      >
        {media.map((image, index) => (
          <div key={index}>
            {imageValidity[index] ? (
              <img
                src={image.url}
                alt={image.alt || "Venue image"}
                className="w-full h-60 sm:h-80 object-cover rounded-sm"
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="w-full h-60 sm:h-80 bg-gray-300 flex items-center justify-center rounded-sm">
                <span className="text-gray-700">No image found</span>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    );
  }

  if (media.length === 1) {
    return imageValidity[0] ? (
      <img
        src={media[0].url}
        alt={media[0].alt || "Venue image"}
        className="mt-3 w-full h-60 sm:h-80 object-cover rounded-sm"
        onError={() => handleImageError(0)}
      />
    ) : (
      <div className="mt-3 w-full h-60 sm:h-80 bg-gray-300 flex items-center justify-center rounded-sm">
        <span className="text-gray-700">No image found</span>
      </div>
    );
  }

  return (
    <div className="mt-3 w-full h-60 sm:h-80 bg-gray-300 flex items-center justify-center rounded-sm">
      <span className="text-gray-700 text-light">No image available</span>
    </div>
  );
}

VenueMediaCarousel.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
};
