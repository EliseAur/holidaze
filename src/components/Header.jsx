import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  NavWideScreen,
  NavMobile,
  Logo,
  LogoutAccountBtnWideScreen,
  LogoutAccountBtnMobile,
  LoginRegWideScreen,
  LoginRegMobile,
} from "./index";
import { useAuth } from "../context/useAuth";

/**
 * Header component renders the navigation header for the application.
 * It includes a logo, navigation links for wide and mobile screens, and login/logout functionality.
 * The mobile menu can be toggled open or closed, and it automatically closes when clicking outside or navigating to a new route.
 *
 * @component
 * @returns {JSX.Element} The header component with navigation and menu functionality.
 *
 * @example
 * <Header />
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const {
    isLoggedIn,
    venueManager,
    handleLogout: authHandleLogout,
  } = useAuth(); // Use the handleLogout from AuthProvider

  /**
   * Toggles the mobile menu open or closed.
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Closes the mobile menu when clicking outside of it.
   *
   * @param {Event} event - The click event.
   */
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  /**
   * Automatically closes the mobile menu when the route changes.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /**
   * Adds or removes an event listener to detect clicks outside the mobile menu.
   */
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

  /**
   * Logs the user out and navigates to the login page.
   */
  const handleLogout = () => {
    authHandleLogout(); // Call the handleLogout from AuthProvider
    navigate("/login"); // Navigate to the login page
  };

  return (
    <header id="top" className="text-beige font-bold w-full relative z-20">
      <div className=" mx-auto flex justify-between items-center p-3">
        <div className="flex md:items-center flex-grow">
          <Logo />
          <NavWideScreen isLoggedIn={isLoggedIn} venueManager={venueManager} />
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <LogoutAccountBtnWideScreen handleLogout={handleLogout} />
            ) : (
              <LoginRegWideScreen />
            )}
          </div>
          <div className="md:hidden ml-auto mt-1 mr-1">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6 text-3xl hover:text-lightGreen text-shadow"
                title={isOpen ? "Close menu" : "Open menu"}
              />
            </button>
          </div>
        </div>
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
              title="Close menu"
            />
          </button>

          <div className="mt-16 pb-10 space-y-4 ml-auto mr-6">
            <p className="block px-4 mb-3 text-2xl font-black text-right">
              Menu
            </p>
            <hr />
            <NavMobile isLoggedIn={isLoggedIn} venueManager={venueManager} />
            <hr />

            {isLoggedIn ? (
              <LogoutAccountBtnMobile handleLogout={handleLogout} />
            ) : (
              <LoginRegMobile />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
