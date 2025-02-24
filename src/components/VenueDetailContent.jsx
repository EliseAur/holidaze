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
        <h2 className="text-xl font-black">Description</h2>
        <p className="font-bold">{description}</p>
      </div>
      <div className="flex flex-column md:flex-row justify-between">
        <div className=" p-2">
          <h2 className="text-xl font-black">Features hello</h2>
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
            <span className="ml-1">Max {maxGuests} guests</span>
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
              {meta.breakfast ? "Breakfast included" : "Breakfast not included"}
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
        <div className="mt-3 p-2 md:mt-0">
          <h2 className="text-xl font-black">Select dates</h2>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            locale="en-GB"
          />
        </div>
      </div>

      <span>${price}</span>

      <div className="sm:flex">
        <div className="my-4 max-w-[157px] sm:max-w-[180px] sm:flex-1">
          <div className="sm:ml-2 w-full bg-white text-black border-zinc-900 border-2 py-1.5 rounded-md hover:bg-zinc-200 text-center">
            <Link to="/#productsContainer">Back to products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
