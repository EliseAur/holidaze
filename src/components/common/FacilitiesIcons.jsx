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
