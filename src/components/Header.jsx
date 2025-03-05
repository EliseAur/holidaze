import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add event listener to detect clicks outside the menu
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header id="top" className="text-beige font-bold w-full relative z-20">
      <div className="container mx-auto flex justify-between items-center p-3">
        <div>
          <Link
            to="/"
            className="text-2xl text-shadow font-black italic text-lightGreen hover:text-darkGreen sm:text-3xl"
          >
            HoliDaze
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="h-6 w-6 text-2xl hover:text-lightGreen text-shadow"
            />
          </button>
        </div>
        <nav className="hidden md:flex md:items-center flex-grow">
          <div className="flex flex-grow justify-center space-x-1">
            <Link
              to="/"
              className={`text-shadow border border-transparent px-8 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full  whitespace-nowrap ${location.pathname === "/" ? "underline decoration-2" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/venues"
              className={`text-shadow border border-transparent px-5 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full  whitespace-nowrap ${location.pathname === "/venues" ? "underline decoration-2" : ""}`}
            >
              All venues
            </Link>
            {isLoggedIn ? (
              <Link
                to="#"
                className="text-shadow border border-transparent px-3 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full whitespace-nowrap"
              >
                Become a host
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-shadow border border-transparent px-3 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full whitespace-nowrap"
              >
                Become a host
              </Link>
            )}
          </div>
          <div className="flex ml-auto items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="mr-2 text-sm rounded-full bg-zinc-800/50 py-1 px-4 border-beige border-1 text-beige shadow-custom-dark transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen cursor-pointer"
                >
                  Logout
                </button>
                <Link
                  to="/account"
                  className={`text-sm rounded-full py-1 px-1 border-beige border-1 text-beige shadow-custom-dark transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen cursor-pointer ${location.pathname === "/account" ? "bg-lightGreen border-lightGreen text-black" : "bg-zinc-800/50"}`}
                >
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`mr-2 text-sm rounded-full py-1 px-5 border-beige border-1 transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen ${location.pathname === "/login" ? "bg-lightGreen border-lightGreen text-black" : "bg-zinc-800/50"}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-sm rounded-full py-1 px-4 border-beige border-1 transition-all focus:bg-lightGreen focus:border-lightGreen focus:text-black hover:bg-lightGreen hover:text-black hover:border-lightGreen ${location.pathname === "/register" ? "bg-lightGreen border-lightGreen text-black" : "bg-zinc-800/50"}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 pl-15 pb-5 rounded-bl-sm shadow-custom-dark bg-darkerGreen text-beige font-bold flex flex-col items-center justify-start z-50 md:hidden "
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white focus:outline-none mr-5"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="text-lg h-6 w-6 text-beige hover:text-darkGreen"
            />
          </button>

          <div className="mt-16 pb-10 space-y-4 ml-auto mr-6">
            <p className="block px-4 mb-3 text-2xl font-black text-right">
              Menu
            </p>
            <hr />
            <Link
              to="/"
              className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
            >
              Home
            </Link>
            <Link
              to="/venues"
              className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
            >
              All venues
            </Link>
            <Link
              to="#"
              className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
            >
              Become a host
            </Link>
            <div className="flex mt-5">
              <Link
                to="/login"
                className="mr-2 text-sm rounded-full bg-beige py-1 px-5 border-beige border-1 text-black transition-all focus:bg-darkGreen focus:border-darkGreen focus:text-black active:bg-darkGreen active:border-darkGreen active:text-black hover:bg-darkGreen hover:text-black hover:border-darkGreen"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm rounded-full bg-beige text-black py-1 px-3 border-beige border-2 transition-all focus:bg-darkGreen focus:border-darkGreen focus:text-black active:bg-darkGreen active:border-darkGreen active:text-black hover:bg-darkGreen hover:text-black hover:border-darkGreen"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
