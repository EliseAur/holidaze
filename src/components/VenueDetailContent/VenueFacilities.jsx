import PropTypes from "prop-types";
import FacilityIconRounded from "../common/FacilitiesIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

/**
 * VenueFacilities component displays the facilities available at a venue,
 * including the maximum number of guests and specific amenities like WiFi, parking, breakfast, and pet allowance.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {number} props.maxGuests - The maximum number of guests allowed at the venue.
 * @param {Object} props.meta - Metadata about the venue's facilities.
 * @param {boolean} props.meta.wifi - Indicates whether WiFi is available.
 * @param {boolean} props.meta.parking - Indicates whether parking is available.
 * @param {boolean} props.meta.breakfast - Indicates whether breakfast is included.
 * @param {boolean} props.meta.pets - Indicates whether pets are allowed.
 * @returns {JSX.Element} The rendered VenueFacilities component.
 */
export default function VenueFacilities({ maxGuests, meta }) {
  return (
    <div className="min-w-[258.3px] w-full bg-lightBeige rounded-sm shadow-sm p-5 mt-3 sm:mr-1">
      <h2 className="text-md sm:text-lg font-black">Facilities</h2>
      <div className="flex flex-row mt-1">
        <div className="bg-black rounded-full w-[24px] h-[24px] flex items-center justify-center">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-lightBeige mb-0.5 text-xs"
          />
        </div>
        <span className="ml-1">Max {maxGuests} guests</span>
      </div>
      <div className="flex flex-row mt-1">
        <FacilityIconRounded available={meta.wifi} type="wifi" />
        <span className="ml-1">
          {meta.wifi ? "Wifi available" : "No wifi in the venue"}
        </span>
      </div>
      <div className="flex flex-row mt-1">
        <FacilityIconRounded available={meta.parking} type="parking" />
        <span className="ml-1">
          {meta.parking ? "Parking available" : "Parking not available"}
        </span>
      </div>
      <div className="flex flex-row mt-1">
        <FacilityIconRounded available={meta.breakfast} type="breakfast" />
        <span className="ml-1">
          {meta.breakfast ? "Breakfast included" : "Breakfast not included"}
        </span>
      </div>
      <div className="flex flex-row mt-1">
        <FacilityIconRounded available={meta.pets} type="pets" />
        <span className="ml-1">
          {meta.pets ? "Pets allowed" : "Pets not allowed"}
        </span>
      </div>
    </div>
  );
}

VenueFacilities.propTypes = {
  maxGuests: PropTypes.number.isRequired,
  meta: PropTypes.shape({
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
    breakfast: PropTypes.bool,
    pets: PropTypes.bool,
  }).isRequired,
};
