import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { fetchLatestVenues } from "../api/fetchVenues";
import { VenueCard, LoadingSpinner } from "../components";
import { BackToTop, ErrorBox } from "../components/common";
import { useFavorites } from "../hooks/useFavorites";
import useSEO from "../hooks/useSEO";

function Home() {
  const [latestVenues, setLatestVenues] = useState([]); // Initialize the state with an empty array
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);
  const [loading, setLoading] = useState(true); // Initialize the loading state
  const [error, setError] = useState(null);

  // Use the SEO hook
  useSEO({
    title: "Holidaze | Home",
    description:
      "Discover beautiful vacation homes and book your next getaway with Holidaze. Explore a wide range of venues for your perfect holiday.",
    keywords:
      "vacation homes, holiday rentals, holiday, travel, getaways, Holidaze",
  });

  useEffect(() => {
    async function getVenues() {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(null); // Reset error state
        const latest = await fetchLatestVenues();
        setLatestVenues(latest); // Store the latest venues in the state
        console.log("Latest Fetched venues:", latest); // Log the fetched venues
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError(
          `Failed to load latest venues. Please try again later. ${error.message}`,
        );
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    getVenues();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (error) {
    return <ErrorBox message={error} />;
  }

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
