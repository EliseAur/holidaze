import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { fetchLatestVenues } from "../api/fetchVenues";
import { VenueCard } from "../components";
import { BackToTop } from "../components/common";
import { useFavorites } from "../hooks/useFavorites";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [latestVenues, setLatestVenues] = useState([]); // Initialize the state with an empty array
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);

  useEffect(() => {
    async function getVenues() {
      try {
        const latest = await fetchLatestVenues();
        setLatestVenues(latest); // Store the latest venues in the state
        console.log("Latest Fetched venues:", latest); // Log the fetched venues
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }

    getVenues();
  }, []);

  return (
    <main
      id="venueContainer"
      className="bg-beige py-8 px-1 sm:px-3 md:px-6 mx-auto max-w-[360px] sm:max-w-[1279px]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2">
        <div>
          <h2 className="text-3xl font-black italic px-1 sm:mx-0">
            Latest venues
          </h2>
          <p className="font-bold text-lg px-1 sm:mx-0">
            Find your next getaway
          </p>
        </div>
        <div className="pb-2 sm:pb-5 mt-3">
          <Link
            to="/venues"
            className="bg-black text-white text-center font-bold py-2 px-4 rounded shadow-custom-dark hover:bg-gray-900 w-[170px] block"
          >
            All venues
          </Link>
        </div>
      </div>
      <div className="px-2 mx-auto  grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {latestVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            isFavorite={favorites.includes(venue.id)}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mx-auto">
        <Link
          to="/venues"
          className="bg-black text-white text-center font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 w-[170px]"
        >
          All venues
        </Link>
        <BackToTop />
      </div>
    </main>
  );
}

export default Home;
