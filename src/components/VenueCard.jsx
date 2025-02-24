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
} from "@fortawesome/free-solid-svg-icons";

export default function VenueCard({ venue }) {
  return (
    <div className="bg-lightBeige rounded-sm shadow-lg relative">
      <Link to={`/venue/${venue.id}`}>
        <img
          src={venue.media[0]?.url || "src/images/home-beach.jpg"}
          alt={venue.media[0]?.alt || "Beautiful home at the beach"}
          className="rounded-t-sm w-full h-56 object-cover object-center"
        />
      </Link>
      <button className="absolute top-2 right-2 text-2xl text-lightBeige text-shadow hover:text-darkGreen hover:scale-110 transform transition-transform duration-200">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="p-4">
        <Link to={`/venue/${venue.id}`}>
          <h2 className="text-xl font-black hover:underline hover:decoration-2 truncate">
            {venue.name}
          </h2>
        </Link>
        <div className="text-sm flex w-full justify-between text-center mt-2 space-x-2">
          <div className="flex-grow font-bold border border-black rounded-sm p-1 inline-block">
            <span className="font-black">${venue.price}</span>/night
          </div>
          <div className="flex-grow border border-black rounded-sm p-1 inline-block">
            <span className="font-bold">
              <FontAwesomeIcon icon={faUserGroup} className="mr-1" />
              Max {venue.maxGuests} guests
            </span>
          </div>
          <div className="flex-grow items-center border border-black rounded-sm p-1 inline-block">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <span className="ml-1 font-bold">{venue.rating}</span>
          </div>
        </div>
        <div className="flex w-full justify-between text-center mt-2 space-x-2">
          <div className="text-sm font-bold flex-grow items-center border border-black rounded-sm p-1 inline-block truncate">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-red-500 mr-2"
            />
            {venue.location.country} - {venue.location.city}
          </div>
          <div className="items-center space-x-2 flex-grow border border-black rounded-sm p-1 inline-block min-w-[114px]">
            <span title={venue.meta.wifi ? "Wifi available" : "No wifi"}>
              <FontAwesomeIcon
                icon={faWifi}
                className={venue.meta.wifi ? "text-black" : "text-gray-400"}
              />
            </span>
            <span title={venue.meta.pets ? "Pets Allowed" : "No pets allowed"}>
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
                className={venue.meta.parking ? "text-black" : "text-gray-400"}
              />
            </span>
          </div>
        </div>
        <div>
          <Link
            to={`/venue/${venue.id}`}
            className="inline-block w-full text-center bg-lightGreen text-black font-bold py-2 px-4 rounded mt-4 shadow-custom-dark hover:bg-darkGreen"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
