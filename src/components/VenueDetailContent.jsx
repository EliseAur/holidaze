// import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { calculateDiscount } from "../utils";
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
  faHeart,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

registerLocale("en-GB", enGB);

export default function VenueDetailContent({ venue }) {
  const { name, media, description, price, rating, maxGuests, meta } = venue;
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="mx-auto p-4 max-w-[500px]">
      <h1 className="text-3xl font-black break-words">{name}</h1>
      {media.length > 1 ? (
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          className="mt-3"
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
      ) : (
        <img
          src={media[0]?.url}
          alt={media[0]?.alt || "Beautiful home at the beach"}
          className="mt-3 w-full h-60 sm:h-72 object-cover rounded-sm"
        />
      )}

      <div className="mt-3 p-2">
        <h2 className="text-xl font-black break-words">Description</h2>
        <p className="font-bold break-words">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="">
          <div className="p-2">
            <h2 className="text-xl font-black">Features</h2>
            <div>
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-500 text-xl"
              />
              <span className="ml-1 font-bold">{rating}</span>
            </div>

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
          <div className="p-2">
            <h2 className="text-xl font-black">Contact host</h2>
            <p className="font-bold break-words">
              For any inquiries, please contact the host directly.
            </p>
          </div>
        </div>

        <div className="p-2 h-full">
          <h2 className="text-xl font-black">Select dates</h2>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            locale="en-GB"
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
          <div className="mt-4 ml-1">
            <p>
              <span className="font-bold">Price:</span> 200$/night
            </p>
          </div>
          <div className="select-number-of-guests mt-4 max-w-[242.3px]">
            <label className="block">
              <span className="font-bold ml-1">Guests</span>
              <select
                name="guests"
                className="form-select block w-full bg-white px-2 py-1 rounded-sm shadow-sm  text-sm"
              >
                {/* <option value="">Any</option> */}
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">More than 4 guests</option>
              </select>
            </label>
          </div>
          <div className="mt-4 max-w-[242.3px]">
            <p className="text-xs mb-1">
              Login or register to book your nest stay
            </p>
            <div className="bg-lightGreen text-black font-bold py-1.5 rounded-sm hover:bg-darkGreen shadow-custom-dark text-center mb-2">
              <Link to="/login">Login</Link>
            </div>
            <div className="bg-black text-white font-bold py-1.5 rounded-sm hover:bg-gray-900 shadow-custom-dark text-center">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="p-2">
        <h2 className="text-xl font-black">Contact host</h2>
        <p className="font-bold break-words">
          For any inquiries, please contact the host directly.
        </p>
      </div> */}

      <span>${price}</span>
    </div>
  );
}
