import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faStar,
  faMapMarkerAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function VenueCard() {
  return (
    <div className="bg-lightBeige rounded-sm shadow-lg relative">
      <a href="">
        <img
          src="/src/images/home-beach.jpg"
          alt="Beautiful home at the beach"
          className="rounded-t-sm"
        />
      </a>
      <button className="absolute top-2 right-2 text-2xl text-lightBeige text-shadow hover:text-darkGreen hover:scale-110 transform transition-transform duration-200">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="p-4">
        <a href="">
          <h2 className="text-xl font-black hover:underline hover:decoration-2 truncate">
            Room with a view that is absolutely stunning and breathtaking
          </h2>
        </a>
        <div className="text-sm flex w-full justify-between text-center mt-2 space-x-2">
          <div className="flex-grow font-bold border border-black rounded-sm p-1 inline-block">
            $200/night
          </div>
          <div className="flex-grow border border-black rounded-sm p-1 inline-block">
            <span className="font-bold">Guests:</span> 4
          </div>
          <div className="flex-grow items-center border border-black rounded-sm p-1 inline-block">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <span className="ml-1 font-bold">4.5</span>
          </div>
        </div>
        <div className="flex w-full justify-between text-center mt-2 space-x-2">
          <div className="text-sm font-bold flex-grow items-center border border-black rounded-sm p-1 inline-block">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-red-500 mr-2"
            />
            Norway - Lofoten
          </div>
          <div className="items-center space-x-2 flex-grow border border-black rounded-sm p-1 inline-block">
            <span title="Wifi">
              <FontAwesomeIcon icon={faWifi} />
            </span>
            <span title="Pets Allowed">
              <FontAwesomeIcon icon={faPaw} />
            </span>
            <span title="Breakfast Included">
              <FontAwesomeIcon icon={faUtensils} />
            </span>
            <span title="Parking Available">
              <FontAwesomeIcon icon={faParking} />
            </span>
          </div>
        </div>
        <button className="w-full bg-lightGreen text-black font-bold py-2 px-4 rounded mt-4 shadow-custom-dark hover:bg-darkGreen">
          View
        </button>
      </div>
    </div>
  );
}
