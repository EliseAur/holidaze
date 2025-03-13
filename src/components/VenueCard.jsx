import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faStar,
  faMapMarkerAlt,
  faHeart,
  faUserGroup,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
// import { useState, useEffect } from "react";

export default function VenueCard({ venue, isFavorite, onFavoriteClick }) {
  return (
    <div className="bg-lightBeige rounded-sm shadow-lg relative hover:shadow-custom-dark">
      {venue.media.length > 0 ? (
        <Link to={`/venue/${venue.id}`}>
          <img
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt || "Venue image"}
            className="rounded-t-sm w-full h-56 object-cover object-center cursor-pointer"
          />
        </Link>
      ) : (
        <div className="rounded-t-sm w-full h-56 object-cover object-center cursor-pointer bg-gray-300 flex items-center justify-center">
          <span className="text-gray-700">No image available</span>
        </div>
      )}
      <button
        className={`absolute top-2 right-2 text-2xl text-lightBeige text-shadow hover:scale-110 transform transition-transform duration-200 cursor-pointer ${isFavorite ? "text-lightGreen hover:none" : ""}`}
        onClick={() => onFavoriteClick(venue.id)}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="px-3 pt-2 pb-4">
        <Link to={`/venue/${venue.id}`}>
          <h2 className="text-lg md:text-xl font-black underline hover:underline hover:decoration-2 truncate p-1">
            {venue.name}
          </h2>
        </Link>
        <div className="text-sm font-bold flex-grow flex justify-between p-1">
          <span className="flex-grow truncate">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-red-500 mr-1"
            />
            {venue.location.country} - {venue.location.city}
          </span>

          <span className="flex-grow text-right">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <span className="ml-1">{venue.rating}</span>
          </span>
        </div>
        <div className="text-sm flex w-full justify-between p-1">
          <div className="flex-grow ">
            <span className="font-bold">
              <FontAwesomeIcon icon={faSackDollar} className="mr-1" />
              {venue.price} USD
            </span>
            <span className="font-regular">/night</span>
          </div>
          <div className="flex-grow text-right">
            <span className="font-bold">
              <FontAwesomeIcon icon={faUserGroup} className="mr-1" />
              {venue.maxGuests}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between text-center mt-2 space-x-2">
          <div className="space-x-3 flex flex-grow justify-between text-xl p-1">
            <Link
              to={`/venue/${venue.id}`}
              className="text-sm bg-lightGreen text-black font-bold py-1 px-4 rounded-sm shadow-custom-dark hover:bg-darkGreen w-full text-center"
            >
              View
            </Link>
            <div className="md:min-w-[114px] flex flex-grow  justify-between space-x-2 text-lg">
              <span title={venue.meta.wifi ? "Wifi available" : "No wifi"}>
                <FontAwesomeIcon
                  icon={faWifi}
                  className={venue.meta.wifi ? "text-black" : "text-gray-400"}
                />
              </span>
              <span
                title={venue.meta.pets ? "Pets Allowed" : "No pets allowed"}
              >
                <FontAwesomeIcon
                  icon={faPaw}
                  className={venue.meta.pets ? "text-black" : "text-gray-400"}
                />
              </span>
              <span
                title={
                  venue.meta.breakfast ? "Breakfast Included" : "No breakfast"
                }
              >
                <FontAwesomeIcon
                  icon={faUtensils}
                  className={
                    venue.meta.breakfast ? "text-black" : "text-gray-400"
                  }
                />
              </span>
              <span
                title={
                  venue.meta.parking
                    ? "Parking Available"
                    : "No parking available"
                }
              >
                <FontAwesomeIcon
                  icon={faParking}
                  className={
                    venue.meta.parking ? "text-black" : "text-gray-400"
                  }
                />
              </span>
            </div>
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
};
