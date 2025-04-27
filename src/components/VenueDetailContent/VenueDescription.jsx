import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

/**
 * VenueDescription component displays the description of a venue.
 * It truncates the description if it exceeds 40 words and provides a toggle
 * to show the full description or collapse it back.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.description - The description of the venue.
 * @returns {JSX.Element} The rendered VenueDescription component.
 */
export default function VenueDescription({ description }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = description.split(" ").slice(0, 40).join(" ");
  const isTruncated = description.split(" ").length > 40;

  return (
    <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
      <h2 className="text-md sm:text-lg font-black break-words">Description</h2>
      <p className="break-words text-sm sm:text-base">
        {showFullDescription || !isTruncated
          ? description
          : `${truncatedDescription}...`}
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
  );
}

VenueDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
