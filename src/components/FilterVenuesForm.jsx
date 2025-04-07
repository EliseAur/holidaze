import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faSliders,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function FilterVenuesForm({
  searchQuery,
  filters,
  onSearchChange,
  onInputChange,
  onApplyFilters,
  onResetFilters,
}) {
  if (!filters) {
    console.error("Filters prop is undefined in FilterVenuesForm.");
    return null; // Prevent rendering if filters is undefined
  }
  return (
    <div className="mt-5 p-4 mx-2 bg-lightBeige shadow-sm rounded-sm">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h2 className="text-xl font-bold mb-2">
          <FontAwesomeIcon icon={faSliders} className="mr-2 mt-4" />
          Filter Venues
        </h2>
        <div className="flex mt-2 shadow-sm sm:max-w-[49.5%] w-full sm:ml-auto">
          <input
            type="text"
            placeholder="Search for venues..."
            className="flex-grow w-full py-2 px-3 rounded-l-sm focus:outline-none bg-white  text-black placeholder-stone-400"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <button
            onClick={onApplyFilters}
            className="bg-black text-white font-bold px-3 py-2 rounded-r-sm hover:bg-gray-800 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="parking"
                className="form-checkbox"
                checked={filters.parking}
                onChange={onInputChange}
              />
              <FontAwesomeIcon icon={faParking} />
              <span>Parking</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="pets"
                className="form-checkbox"
                checked={filters.pets}
                onChange={onInputChange}
              />
              <FontAwesomeIcon icon={faPaw} />
              <span>Pets</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="wifi"
                className="form-checkbox"
                checked={filters.wifi}
                onChange={onInputChange}
              />
              <FontAwesomeIcon icon={faWifi} />
              <span>Wifi</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="breakfast"
                className="form-checkbox"
                checked={filters.breakfast}
                onChange={onInputChange}
              />
              <FontAwesomeIcon icon={faUtensils} />
              <span>Breakfast</span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block">
              <span className="font-bold ml-1">Guests</span>
              <select
                name="guests"
                className="form-select block w-full bg-white px-2 py-1 rounded-sm shadow-sm text-sm"
                value={filters.guests}
                onChange={onInputChange}
              >
                <option value="">Any</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">More than 4 Guests</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block">
              <span className="font-bold ml-1">Price</span>
              <select
                name="price"
                className="form-select block w-full bg-white px-2 py-1 rounded-sm shadow-sm text-sm"
                value={filters.price}
                onChange={onInputChange}
              >
                <option value="">Any price</option>
                <option value="low">Lower than 50 $</option>
                <option value="medium">From 50$ - 100$</option>
                <option value="high">Higher than 100$</option>
              </select>
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={onResetFilters} // Call resetFilters when clicked
          className="bg-black text-beige font-bold py-2 px-4 rounded mt-4 col-span-2 sm:col-start-1 sm:max-w-[200px]"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

FilterVenuesForm.propTypes = {
  searchQuery: PropTypes.string.isRequired, // The search query string
  filters: PropTypes.shape({
    parking: PropTypes.bool,
    pets: PropTypes.bool,
    wifi: PropTypes.bool,
    breakfast: PropTypes.bool,
    guests: PropTypes.string,
    price: PropTypes.string,
  }).isRequired, // The filters object
  onSearchChange: PropTypes.func.isRequired, // Function to handle search input changes
  onInputChange: PropTypes.func.isRequired, // Function to handle filter input changes
  onApplyFilters: PropTypes.func.isRequired, // Function to apply filters
  onResetFilters: PropTypes.func.isRequired, // Function to reset filters
};
