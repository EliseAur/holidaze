import { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import {
  fetchAllVenues,
  fetchAllVenuesWithoutPagination,
} from "../api/fetchVenues";
import { FilterVenues, VenueCard, LoadingSpinner } from "../components";
import { BackToTop, ErrorBox } from "../components/common";
import { useFavorites } from "../hooks/useFavorites";
import useSEO from "../hooks/useSEO";

/**
 * Venues component for displaying a list of all available venues.
 * Supports pagination, filtering, and searching for venues.
 * Allows users to mark venues as favorites and load more venues dynamically.
 *
 * @component
 * @returns {JSX.Element} The rendered Venues component.
 *
 * @example
 * <Venues />
 */
function Venues() {
  const [allVenues, setAllVenues] = useState([]); // Store all venues fetched in the background
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array
  const [page, setPage] = useState(1); // Initialize the page state
  const [filteredVenues, setFilteredVenues] = useState([]); // Filtered venues
  const [loading, setLoading] = useState(false); // Initialize the loading state
  const [error, setError] = useState(null);
  const { isLoggedIn } = useOutletContext();
  const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);
  const [noMatches, setNoMatches] = useState(false);

  useSEO({
    title: "Holidaze | All Venues",
    description:
      "Explore all available venues on Holidaze. Use filters and search to find the perfect vacation home for your next getaway.",
    keywords:
      "all venues, vacation homes, holiday rentals, venue search, venue filters, Holidaze",
  });

  /**
   * Fetches all venues in the background without pagination.
   * Stores the fetched venues in the `allVenues` state.
   *
   * @async
   * @returns {Promise<void>} Resolves when all venues are fetched.
   */
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

  /**
   * Fetches paginated venues based on the current page.
   * Updates the `venues` state with the fetched data.
   *
   * @async
   * @returns {Promise<void>} Resolves when paginated venues are fetched.
   */
  useEffect(() => {
    async function getPaginatedVenues() {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const newVenues = await fetchAllVenues(page); // Fetch venues for the current page
        setVenues((prevVenues) => {
          const updatedVenues =
            page === 1 ? newVenues : [...prevVenues, ...newVenues];
          return updatedVenues;
        });
      } catch (error) {
        console.error("Error fetching paginated venues:", error);
        setError(
          `Failed to load venues. Please try again later. ${error.message}`,
        );
      } finally {
        setLoading(false);
      }
    }

    getPaginatedVenues();
  }, [page]);

  /**
   * Handles filtering of venues based on user input.
   * Updates the `filteredVenues` and `noMatches` states accordingly.
   *
   * @param {Array<Object>|null} filtered - The filtered venues or `null` to reset filters.
   */
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

  /**
   * Loads more venues by incrementing the page number.
   */
  const loadMoreVenues = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  /**
   * Determines the venues to display based on filtering and pagination.
   *
   * @returns {Array<Object>} The venues to display.
   */
  const venuesToDisplay = noMatches
    ? []
    : filteredVenues.length > 0
      ? filteredVenues
      : venues;

  return (
    <div
      id="venueContainer"
      className="bg-beige py-8 lg:px-8 px-1 sm:px-3 md:px-6 mx-auto max-w-[360px] sm:max-w-[1279px]"
    >
      <h2 className="text-3xl font-black italic px-2 sm:mx-0">All venues</h2>
      <FilterVenues venues={allVenues} onFilter={handleFilter} />
      {error ? (
        <ErrorBox message={error} />
      ) : loading && page === 1 ? (
        <LoadingSpinner />
      ) : noMatches ? (
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
          {filteredVenues.length === 0 && venues.length < allVenues.length && (
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
    </div>
  );
}

export default Venues;
