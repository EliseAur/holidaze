import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VenueCard, LoadingSpinner } from "../components";
import { ErrorBox } from "../components/common";
import { fetchFavorites } from "../api/fetchFavorites";
import { useFavorites } from "../hooks/useFavorites";
import useSEO from "../hooks/useSEO";

/**
 * Favorites component for displaying and managing the user's favorite venues.
 * Fetches the user's favorite venues from the API and allows users to view or remove them from their favorites list.
 * Displays a loading spinner while fetching data and an error message if the fetch fails.
 *
 * @component
 * @returns {JSX.Element} The rendered Favorites component.
 *
 * @example
 * <Favorites />
 */
export default function Favorites() {
  const { favorites, handleFavoriteClick } = useFavorites(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the SEO hook
  useSEO({
    title: "Holidaze | Favorites",
    description:
      "View and manage your favorite venues on Holidaze. Explore your saved vacation homes and plan your next getaway.",
    keywords:
      "favorite venues, saved vacation homes, Holidaze favorites, travel, getaways",
  });

  useEffect(() => {
    const fetchFavoriteVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedVenues = await fetchFavorites();
        setFavoriteVenues(fetchedVenues);
      } catch (error) {
        setError(
          error.message || "Failed to load favorites. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteVenues();
  }, [favorites]);

  if (loading) {
    return <LoadingSpinner />;
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
