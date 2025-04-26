import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * NavWideScreen component renders the navigation menu for wide screens.
 * It includes links to various pages such as Home, All Venues, Account, Favorites, and Register.
 * The navigation adjusts based on the user's login status and whether they are a venue manager.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in.
 * @param {boolean} props.venueManager - Indicates if the user is a venue manager.
 * @returns {JSX.Element} The navigation menu for wide screens.
 *
 * @example
 * <NavWideScreen isLoggedIn={true} venueManager={false} />
 */
export function NavWideScreen({ isLoggedIn, venueManager }) {
  return (
    <nav className="hidden md:flex flex-grow justify-center items-center">
      <Link
        to="/"
        className={`text-shadow border border-transparent px-4 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full  whitespace-nowrap ${location.pathname === "/" ? "underline decoration-2" : ""}`}
      >
        Home
      </Link>
      <Link
        to="/venues"
        className={`text-shadow border border-transparent px-4 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full  whitespace-nowrap ${location.pathname === "/venues" ? "underline decoration-2" : ""}`}
      >
        All venues
      </Link>
      {isLoggedIn ? (
        <>
          {venueManager ? (
            <Link
              to="/account"
              className={`text-shadow border border-transparent px-3 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full whitespace-nowrap ${location.pathname === "/account" ? "underline decoration-2" : ""}`}
            >
              Account
            </Link>
          ) : (
            <Link
              to="/account"
              className={`text-shadow border border-transparent px-3 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full whitespace-nowrap ${location.pathname === "/account" ? "underline decoration-2" : ""}`}
            >
              Become a host
            </Link>
          )}
          <Link
            to="/favorites"
            className={`text-shadow border border-transparent px-3 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full whitespace-nowrap ${location.pathname === "/favorites" ? "underline decoration-2" : ""}`}
          >
            Favorites
          </Link>
        </>
      ) : (
        <Link
          to="/register"
          className={`text-shadow border border-transparent px-3 py-2 text-center hover:border hover:border-beige hover:bg-zinc-800/20 rounded-full whitespace-nowrap ${location.pathname === "/register" ? "underline decoration-2" : ""}`}
        >
          Become a host
        </Link>
      )}
    </nav>
  );
}

/**
 * NavMobile component renders the navigation menu for mobile screens.
 * It includes links to various pages such as Home, All Venues, Account, Favorites, and Register.
 * The navigation adjusts based on the user's login status and whether they are a venue manager.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in.
 * @param {boolean} props.venueManager - Indicates if the user is a venue manager.
 * @returns {JSX.Element} The navigation menu for mobile screens.
 *
 * @example
 * <NavMobile isLoggedIn={true} venueManager={false} />
 */
export function NavMobile({ isLoggedIn, venueManager }) {
  return (
    <nav>
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
      {isLoggedIn ? (
        <>
          {venueManager ? (
            <Link
              to="/account"
              className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
            >
              Account
            </Link>
          ) : (
            <Link
              to="/account"
              className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
            >
              Become a host
            </Link>
          )}
          <Link
            to="/favorites"
            className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
          >
            Favorites
          </Link>
        </>
      ) : (
        <Link
          to="/register"
          className="block px-4 py-2 text-lg hover:text-darkGreen text-right"
        >
          Become a host
        </Link>
      )}
    </nav>
  );
}

NavWideScreen.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  venueManager: PropTypes.bool.isRequired,
};

NavMobile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  venueManager: PropTypes.bool.isRequired,
};
