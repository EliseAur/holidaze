import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VenueCard, LoadingSpinner } from "../components";
import { ErrorBox } from "../components/common";
import { fetchFavorites } from "../api/fetchFavorites";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites, handleFavoriteClick } = useFavorites(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteVenues = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const fetchedVenues = await fetchFavorites();
        setFavoriteVenues(fetchedVenues);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteVenues();
  }, [favorites]);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (error) {
    return <ErrorBox message={error} />;
  }

  return (
    <div className="bg-beige py-8 lg:px-8  max-w-96 px-3 sm:max-w-2xl sm:px-4 md:max-w-3xl md:px-6 lg:max-w-6xl mx-auto">
      <h1 className="text-3xl font-black italic">My favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {favoriteVenues.length > 0 ? (
          favoriteVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              isFavorite={true}
              onFavoriteClick={handleFavoriteClick}
            />
          ))
        ) : (
          <div>
            <p className="text-lg">No favorite venues yet..</p>
            <p className="text-lg mt-3">
              <span>Check out our </span>
              <Link to="/venues" className=" font-bold decoration-2 underline">
                beautiful homes
              </Link>
              <span> and start creating your list of favorites ❤</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
