import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { fetchLatestVenues } from "../api/fetchVenues";
import { FilterVenues, VenueCard } from "../components";
import { useFavorites } from "../hooks/useFavorites";

function Home() {
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);

  useEffect(() => {
    async function getVenues() {
      try {
        const venues = await fetchLatestVenues();
        console.log("Latest Fetched venues:", venues); // Log the fetched venues
        setVenues(venues); // Store the fetched venues in the state
      } catch (error) {
        console.error("Error fetching latest venues:", error);
      }
    }

    getVenues();
  }, []);

  return (
    <main
      id="venueContainer"
      className="bg-beige py-8 lg:px-8  max-w- px-3 sm:max-w-2xl sm:px-4 md:max-w-3xl md:px-6 lg:max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-black italic">Latest venues</h2>
      <p className="font-bold text-lg">Find your next getaway</p>
      <FilterVenues />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {venues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            isFavorite={favorites.includes(venue.id)}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
      <div className="bg-black text-white text-center font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 mx-auto w-3xs">
        <Link to="/venues">All venues</Link>
      </div>
    </main>
  );
}

export default Home;
