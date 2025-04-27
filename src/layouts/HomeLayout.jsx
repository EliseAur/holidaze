import { useEffect, useState } from "react";
import { HeaderWithHero, Footer } from "../components";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { fetchAllVenuesWithoutPagination } from "../api";

/**
 * HomeLayout component provides the layout for the home page.
 * It fetches all venues and passes them to the HeaderWithHero component.
 * It also uses the authentication context to pass login state and functions to child components via the Outlet.
 *
 * @component
 * @returns {JSX.Element} The home layout component.
 *
 * @example
 * <HomeLayout />
 */
function HomeLayout() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const [allVenues, setAllVenues] = useState([]); // All venues

  useEffect(() => {
    async function getAllVenues() {
      try {
        const all = await fetchAllVenuesWithoutPagination();
        setAllVenues(all); // Store all venues in the state
      } catch (error) {
        throw new Error("Failed to fetch venues: ", error.message);
      }
    }

    getAllVenues();
  }, []);

  return (
    <div>
      <HeaderWithHero allVenues={allVenues} />
      <Outlet context={{ isLoggedIn, handleLogin, handleLogout }} />
      <Footer />
    </div>
  );
}

export default HomeLayout;
