import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const icons = {
  wifi: faWifi,
  pets: faPaw,
  breakfast: faUtensils,
  parking: faParking,
};

/**
 * FacilityIconRounded component displays a rounded icon representing a facility (e.g., WiFi, pets, breakfast, parking).
 * The icon's background color changes based on the availability of the facility.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.available - Whether the facility is available.
 * @param {string} props.type - The type of facility (e.g., "wifi", "pets", "breakfast", "parking").
 * @returns {JSX.Element} A styled span element containing the facility icon.
 *
 * @example
 * <FacilityIconRounded available={true} type="wifi" />
 * <FacilityIconRounded available={false} type="parking" />
 */
export default function FacilityIconRounded({ available, type }) {
  return (
    <span
      title={available ? `${type} available` : `${type} not available`}
      className={
        available
          ? "bg-black rounded-full w-[24px] h-[24px] flex items-center justify-center"
          : "bg-darkBeige rounded-full w-[24px] h-[24px] flex items-center justify-center"
      }
    >
      <FontAwesomeIcon icon={icons[type]} className="text-lightBeige text-sm" />
    </span>
  );
}

FacilityIconRounded.propTypes = {
  available: PropTypes.bool.isRequired, // Whether the facility is available
  type: PropTypes.oneOf(["wifi", "pets", "breakfast", "parking"]).isRequired, // Type of facility
};
