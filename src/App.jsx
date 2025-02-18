// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faPaw,
  faUtensils,
  faParking,
  faStar,
  faSliders,
  faMapMarkerAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div id="" className="">
      <div
        className="headerNavBox bg-cover bg-bottom
       bg-no-repeat bg-fixed h-screen relative"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <header className="text-beige font-bold w-full relative z-10">
          <div className="container mx-auto flex justify-between items-center p-3">
            <div>
              <a
                href="#"
                className="text-2xl text-shadow font-black italic text-lightGreen hover:text-darkGreen sm:text-3xl"
              >
                HoliDaze
              </a>
            </div>
            <nav className="hidden md:flex md:items-center space-x-3">
              <a
                href="#"
                className="text-shadow border border-transparent px-3 py-1 mx-3 flex-1 text-center hover:border hover:border-beige rounded-sm  underline decoration-2 whitespace-nowrap"
              >
                Home
              </a>
              <a
                href="#"
                className="text-shadow border border-transparent px-3 py-1 mx-3 flex-1 text-center hover:border hover:border-beige rounded-sm whitespace-nowrap"
              >
                All venues
              </a>
              <a
                href="#"
                className="text-shadow border border-transparent px-3 py-1 mx-3 flex-1 text-center hover:border hover:border-beige rounded-sm whitespace-nowrap"
              >
                Become a host
              </a>
            </nav>
            <div className="row flex">
              <a
                href="#"
                className="text-sm rounded-l-sm bg-zinc-800/50 py-1 px-3 border border-beige border-2 text-beige transition-all focus:bg-lightGreen focus:border-darkGreen focus:text-black active:bg-lightgreen active:border-darkGreen active:text-black hover:bg-lightGreen hover:text-black hover:border-darkGreen"
              >
                Login
              </a>
              <a
                href="#"
                className="text-sm rounded-r-sm bg-beige text-black py-1 px-3 border border-beige border-2 transition-all focus:bg-lightGreen focus:border-darkGreen focus:text-black active:bg-lightgreen active:border-darkGreen active:text-black hover:bg-lightGreen hover:text-black hover:border-darkGreen"
              >
                Register
              </a>
            </div>
          </div>
        </header>
        <hero className="text-beige relative z-10 text-center">
          <div className="py-20 px-4 sm:px-6 lg:px-8">
            <h1 className="text-shadow text-4xl sm:text-5xl lg:text-6xl font-black italic ">
              Find Your Perfect Getaway
            </h1>
            <div className="font-bold text-shadow mt-4 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto">
              <p>Book unique stays in stunning destinations</p>
              <p>
                Or share your home with the world by register as a host and earn
                from your space.
              </p>
            </div>
            <div className="max-w-[300px] mx-auto">
              <a
                className="w-full mt-8 inline-block bg-lightGreen text-black font-bold px-6 py-2 rounded-sm text-lg hover:bg-darkGreen"
                href="/"
              >
                Latest venues
              </a>
              <div className="flex mt-4 w-full">
                <input
                  type="text"
                  placeholder="Search for venues..."
                  className="flex-grow w-full sm:w-auto py-2 px-3 rounded-l-sm focus:outline-none input-inner-shadow bg-zinc-800/50 bg-opacity-90 border-beige border-2 text-beige placeholder-stone-400"
                  value=""
                />
                <button className="bg-beige text-black font-bold px-3 py-2 rounded-r-sm hover:bg-lightBeige">
                  Search
                </button>
              </div>
            </div>
          </div>
        </hero>
      </div>
      <main className="bg-beige py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black italic">Latest venues</h2>
        <p className="font-bold text-lg mt-2">Find your next getaway</p>
        {/* filter start */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">
            <FontAwesomeIcon icon={faSliders} className="mr-2" />
            Filter Venues
          </h2>
          <div className=" grid grid-cols-2 gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    name="parking"
                    className="form-checkbox"
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
            <div className="mt-4">
              <button className="bg-lightGreen text-black font-bold shadow-custom-dark py-2 px-4 rounded-sm hover:bg-darkGreen">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        {/* filter finished */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {/* Venue Card 1 */}
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
                  <FontAwesomeIcon icon={faWifi} />
                  <FontAwesomeIcon icon={faPaw} />
                  <FontAwesomeIcon icon={faUtensils} />
                  <FontAwesomeIcon icon={faParking} />
                </div>
              </div>
              <button className="w-full bg-lightGreen text-black font-bold py-2 px-4 rounded mt-4 shadow-custom-dark hover:bg-darkGreen">
                View
              </button>
            </div>
          </div>
          {/* Venue Card 2 */}
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
                  <FontAwesomeIcon icon={faWifi} />
                  <FontAwesomeIcon icon={faPaw} />
                  <FontAwesomeIcon icon={faUtensils} />
                  <FontAwesomeIcon icon={faParking} />
                </div>
              </div>
              <button className="w-full bg-lightGreen text-black font-bold py-2 px-4 rounded mt-4 shadow-custom-dark hover:bg-darkGreen">
                View
              </button>
            </div>
          </div>
          {/* Venue Card 3 */}
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
                  <FontAwesomeIcon icon={faWifi} />
                  <FontAwesomeIcon icon={faPaw} />
                  <FontAwesomeIcon icon={faUtensils} />
                  <FontAwesomeIcon icon={faParking} />
                </div>
              </div>
              <button className="w-full bg-lightGreen text-black font-bold py-2 px-4 rounded mt-4 shadow-custom-dark hover:bg-darkGreen">
                View
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer
        className=" py-6 px-4 text-beige bg-cover bg-center
       bg-no-repeat relative"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 relative mx-auto flex justify-between items-center">
          <div>
            <a
              to="/"
              className="text-shadow font-black italic text-lightGreen hover:text-darkGreen text-2xl sm:text-3xl"
            >
              HoliDaze
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-beige text-shadow text-3xl hover:text-lightGreen"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-beige text-shadow text-3xl hover:text-lightGreen"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="text-beige text-shadow text-3xl hover:text-lightGreen"
              />
            </a>
          </div>
        </div>
        <div className="z-10 relative text-shadow font-bold text-center py-4">
          &copy; 2025 Elise Aurtande, Inc. All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default App;
