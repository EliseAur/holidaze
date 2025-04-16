import { useEffect, useState } from "react";
import { HeaderWithHero, Footer } from "../components";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { fetchAllVenuesWithoutPagination } from "../api";

function HomeLayout() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const [allVenues, setAllVenues] = useState([]); // All venues

  useEffect(() => {
    async function getAllVenues() {
      try {
        const all = await fetchAllVenuesWithoutPagination();
        setAllVenues(all); // Store all venues in the state
      } catch (error) {
        console.error("Error fetching all venues:", error);
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
