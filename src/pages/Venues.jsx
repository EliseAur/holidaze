import { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  fetchAllVenues,
  fetchAllVenuesWithoutPagination,
} from "../api/fetchVenues";
import { FilterVenues, VenueCard, LoadingSpinner } from "../components";
import { BackToTop } from "../components/common";
import { useFavorites } from "../hooks/useFavorites";

function Venues() {
  const [allVenues, setAllVenues] = useState([]); // Store all venues fetched in the background
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array
  const [page, setPage] = useState(1); // Initialize the page state
  const [filteredVenues, setFilteredVenues] = useState([]); // Filtered venues
  const [loading, setLoading] = useState(false); // Initialize the loading state
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);
  const [noMatches, setNoMatches] = useState(false);

  // Fetch all venues in the background
  useEffect(() => {
    async function fetchAllVenuesInBackground() {
      try {
        const allFetchedVenues = await fetchAllVenuesWithoutPagination(); // Fetch all venues
        setAllVenues(allFetchedVenues); // Store all venues in the state
        console.log("Fetched All venues without pagination", allFetchedVenues);
      } catch (error) {
        console.error("Error fetching all venues in the background:", error);
      }
    }

    fetchAllVenuesInBackground();
  }, []);

  // Fetch paginated venues
  useEffect(() => {
    async function getPaginatedVenues() {
      setLoading(true);
      try {
        const newVenues = await fetchAllVenues(page); // Fetch venues for the current page
        setVenues((prevVenues) => {
          const updatedVenues =
            page === 1 ? newVenues : [...prevVenues, ...newVenues];
          return updatedVenues;
        });
      } catch (error) {
        console.error("Error fetching paginated venues:", error);
      } finally {
        setLoading(false);
      }
    }

    getPaginatedVenues();
  }, [page]);

  const handleFilter = useCallback((filtered) => {
    if (filtered === null) {
      setFilteredVenues([]); // Reset filters: show paginated venues
      setPage(1); // Reset to the first page
      setNoMatches(false);
    } else if (filtered.length === 0) {
      setFilteredVenues([]);
      setNoMatches(true);
    } else {
      setFilteredVenues(filtered);
      setNoMatches(false);
    }
  }, []);

  const loadMoreVenues = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  const venuesToDisplay = noMatches
    ? []
    : filteredVenues.length > 0
      ? filteredVenues
      : venues;

  console.log("allVenues:", allVenues); // Log all venues
  console.log("filteredVenues:", filteredVenues); // Log filtered venues
  console.log("venues:", venues); // Log paginated venues
  console.log("page:", page); // Log current page
  console.log("venuesToDisplay", venuesToDisplay); // Log venues to display

  return (
    <div
      id="venueContainer"
      className="bg-beige py-8 lg:px-8 px-1 sm:px-3 md:px-6 mx-auto max-w-[360px]  sm:max-w-[1279px]"
    >
      <h2 className="text-3xl font-black italic px-2 sm:mx-0">All venues</h2>
      <FilterVenues venues={allVenues} onFilter={handleFilter} />
      {loading && page === 1 ? (
        <LoadingSpinner />
      ) : (
        <>
          {noMatches ? ( // Check if no venues match the filter
            <div className="text-center mt-10">
              <p className="text-xl font-bold text-black">
                No venues match your filter or search..
              </p>
              <p className="text-xl font-bold text-black mt-2">
                Reset to see all venues.
              </p>
            </div>
          ) : (
            <>
              <div className="px-2 mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
                {venuesToDisplay.map((venue, index) => (
                  <VenueCard
                    key={`${venue.id}-${index}`}
                    venue={venue}
                    isFavorite={favorites.includes(venue.id)}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>
              {filteredVenues.length === 0 &&
                venues.length < allVenues.length && (
                  <div className="flex justify-center items-center mx-auto">
                    <button
                      className="bg-black text-beige font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 block mr-2 cursor-pointer w-[170px]"
                      onClick={loadMoreVenues}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Load More Venues"}
                    </button>
                    <BackToTop />
                  </div>
                )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Venues;
