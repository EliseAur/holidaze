import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VenueCard } from "../components";
import { fetchFavorites } from "../api/fetchFavorites";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites, handleFavoriteClick } = useFavorites(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);

  useEffect(() => {
    const fetchFavoriteVenues = async () => {
      const fetchedVenues = await fetchFavorites();
      setFavoriteVenues(fetchedVenues);
    };

    fetchFavoriteVenues();
  }, [favorites]);

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
