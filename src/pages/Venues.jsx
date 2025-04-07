import { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  fetchAllVenues,
  fetchAllVenuesWithoutPagination,
} from "../api/fetchVenues";
import { FilterVenues, VenueCard, LoadingSpinner } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../hooks/useFavorites";

function Venues() {
  const [allVenues, setAllVenues] = useState([]); // Store all venues fetched in the background
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array
  const [page, setPage] = useState(1); // Initialize the page state
  const [filteredVenues, setFilteredVenues] = useState([]); // Filtered venues
  const [loading, setLoading] = useState(false); // Initialize the loading state
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);

  // Fetch all venues in the background
  useEffect(() => {
    async function fetchAllVenuesInBackground() {
      try {
        const allFetchedVenues = await fetchAllVenuesWithoutPagination(); // Fetch all venues
        setAllVenues(allFetchedVenues); // Store all venues in the state
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
          setFilteredVenues(updatedVenues); // Update filtered venues for the current page
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

  // Memoize the onFilter function
  const handleFilter = useCallback(
    (filtered) => {
      if (filtered.length === allVenues.length) {
        // No filter or search is active, reset filteredVenues
        setFilteredVenues([]);
      } else {
        // A filter or search is active, update filteredVenues
        setFilteredVenues(filtered);
      }
    },
    [allVenues],
  );

  const loadMoreVenues = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  const isFilterActive =
    filteredVenues.length > 0 || allVenues.length > venues.length;
  const venuesToDisplay = isFilterActive ? filteredVenues : venues;

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
          {/* <div className="px-2 mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
            {venuesToDisplay.map((venue, index) => (
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
          </div> */}
          {isFilterActive && filteredVenues.length === 0 ? ( // Check if no venues match the filter
            <>
              <div className="text-center mt-10">
                <p className="text-xl font-bold text-gray-700">
                  No venues match your filter.
                </p>
              </div>
              <div className="px-2 mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
                {venues.map((venue, index) => (
                  <VenueCard
                    key={`${venue.id}-${index}`}
                    venue={venue}
                    isFavorite={favorites.includes(venue.id)}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>
              {venues.length < allVenues.length && (
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
              )}
            </>
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
              {!isFilterActive && venues.length < allVenues.length && (
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Venues;
