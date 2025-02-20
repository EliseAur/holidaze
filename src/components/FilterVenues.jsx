import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

export default function FilterVenues() {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-2">
        <FontAwesomeIcon icon={faSliders} className="mr-2" />
        Filter Venues
      </h2>
      <div className=" grid grid-cols-2 gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="flex items-center space-x-1">
              <input type="checkbox" name="parking" className="form-checkbox" />
              <FontAwesomeIcon icon={faParking} />
              <span>Parking</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-1">
              <input type="checkbox" name="pets" className="form-checkbox" />
              <FontAwesomeIcon icon={faPaw} />
              <span>Pets</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-1">
              <input type="checkbox" name="wifi" className="form-checkbox" />
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
                className="form-select block w-full bg-lightBeige px-2 py-1 rounded-sm shadow-sm  text-sm"
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
                className="form-select block w-full bg-lightBeige px-2 py-1 rounded-sm shadow-sm text-sm"
              >
                <option value="">Any</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mt-2">
          <button className="bg-lightGreen text-black font-bold shadow-custom-dark py-2 px-4 rounded-sm hover:bg-darkGreen">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
