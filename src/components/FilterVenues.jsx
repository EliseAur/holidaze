import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faSliders,
  faSearch,
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
        <div className="flex flex-col sm:flex-row col-span-2">
          <div className="mt-2 w-full sm:w-auto">
            <button className="bg-black text-white font-bold shadow-lg py-2 px-4 rounded-sm hover:bg-grey-900 w-full cursor-pointer hover:shadow-custom-dark">
              Apply Filters
            </button>
          </div>
          <div className="flex mt-2 shadow-lg flex-grow w-full sm:max-w-[49.5%] sm:ml-auto">
            <input
              type="text"
              placeholder="Search for venues..."
              className="flex-grow w-full py-2 px-3 rounded-l-sm focus:outline-none bg-lightBeige  text-black placeholder-stone-400"
            />
            <button className="bg-black text-white font-bold px-3 py-2 rounded-r-sm hover:bg-gray-800 cursor-pointer">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
