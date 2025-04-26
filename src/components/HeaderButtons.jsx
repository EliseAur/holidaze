import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * Logo component renders the application logo as a clickable link to the homepage.
 *
 * @component
 * @returns {JSX.Element} The logo styled as a link to the homepage.
 *
 * @example
 * <Logo />
 */
export function Logo() {
  return (
    <div>
      <Link
        to="/"
        className="text-3xl text-shadow font-black italic text-lightGreen hover:text-darkGreen sm:text-3xl"
      >
        HoliDaze
      </Link>
    </div>
  );
}

/**
 * LogoutAccountBtnWideScreen component renders a logout button and an account link for wide screens.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleLogout - Function to handle the logout action.
 * @returns {JSX.Element} A logout button and an account link styled for wide screens.
 *
 * @example
 * <LogoutAccountBtnWideScreen handleLogout={handleLogout} />
 */
export function LogoutAccountBtnWideScreen({ handleLogout }) {
  const location = useLocation();
  return (
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
  );
}

/**
 * LogoutAccountBtnMobile component renders a logout button and an account link for mobile screens.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleLogout - Function to handle the logout action.
 * @returns {JSX.Element} A logout button and an account link styled for mobile screens.
 *
 * @example
 * <LogoutAccountBtnMobile handleLogout={handleLogout} />
 */
export function LogoutAccountBtnMobile({ handleLogout }) {
  return (
    <div className="flex text-right px-4">
      <button
        onClick={handleLogout}
        className="mr-2 text-sm rounded-full py-1 px-4  bg-beige text-black shadow-custom-dark transition-all focus:bg-lightGreen hover:bg-lightGreen cursor-pointer"
      >
        Logout
      </button>
      <div
        className={`text-md h-[29.6px] w-[29.6px] rounded-full px-2 bg-beige text-black shadow-custom-dark  transition-all focus:bg-lightGreen hover:bg-lightGreen cursor-pointer `}
      >
        <Link to="/account" title="Account">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </div>
  );
}

/**
 * LoginRegWideScreen component renders login and register buttons for wide screens.
 *
 * @component
 * @returns {JSX.Element} Login and register buttons styled for wide screens.
 *
 * @example
 * <LoginRegWideScreen />
 */
export function LoginRegWideScreen() {
  const location = useLocation();

  return (
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
  );
}

/**
 * LoginRegMobile component renders login and register buttons for mobile screens.
 *
 * @component
 * @returns {JSX.Element} Login and register buttons styled for mobile screens.
 *
 * @example
 * <LoginRegMobile />
 */
export function LoginRegMobile() {
  return (
    <div className="flex mt-5">
      <Link
        to="/login"
        className="mr-2 text-sm rounded-full bg-beige py-1 px-5 text-black transition-all focus:bg-darkGreen  hover:bg-darkGreen"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-sm rounded-full bg-beige text-black py-1 px-3 transition-all focus:bg-darkGreen  hover:bg-darkGreen "
      >
        Register
      </Link>
    </div>
  );
}

LogoutAccountBtnWideScreen.propTypes = {
  handleLogout: PropTypes.func.isRequired, // Validate that handleLogout is a required function
};

LogoutAccountBtnMobile.propTypes = {
  handleLogout: PropTypes.func.isRequired, // Validate that handleLogout is a required function
};
