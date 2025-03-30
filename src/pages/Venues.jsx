import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchAllVenues } from "../api/fetchVenues";
import { FilterVenues, VenueCard, LoadingSpinner } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../hooks/useFavorites";

function Venues() {
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array
  const [page, setPage] = useState(1); // Initialize the page state
  const [loading, setLoading] = useState(false); // Initialize the loading state
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);

  useEffect(() => {
    async function getVenues() {
      setLoading(true);
      try {
        const newVenues = await fetchAllVenues(page);
        setVenues((prevVenues) => {
          if (page === 1) {
            return newVenues; // For the first page, return only newVenues
          } else {
            return [...prevVenues, ...newVenues]; // Append new venues to the existing list for subsequent pages
          }
        }); // Append new venues to the existing list
      } catch (error) {
        console.error("Error fetching ALL venues:", error);
      } finally {
        setLoading(false);
      }
    }

    getVenues();
  }, [page]);

  const loadMoreVenues = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  return (
    <div
      id="venueContainer"
      className="bg-beige py-8 lg:px-8 px-1 sm:px-3 md:px-6 mx-auto sm:max-w-[1279px]"
    >
      <h2 className="text-3xl font-black italic px-2 sm:mx-0">All venues</h2>
      <FilterVenues />
      {loading && page === 1 ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="px-2 mx-auto max-w-[360px] sm:max-w-[1279px] grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
            {venues.map((venue, index) => (
              <VenueCard
                key={`${venue.id}-${index}`}
                venue={venue}
                isFavorite={favorites.includes(venue.id)}
                onFavoriteClick={handleFavoriteClick}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mx-auto">
            <button
              className="bg-black text-beige font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 block mr-2 cursor-pointer w-[170px]"
              onClick={loadMoreVenues}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More Venues"}
            </button>
            <a
              href="#top"
              className="ml-2 text-xl mt-8 px-3 py-1 rounded-full border-3 border-black bg-beige text-black hover:bg-black hover:text-beige block cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Venues;
