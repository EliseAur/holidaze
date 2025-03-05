import { useEffect, useState } from "react";
import { fetchAllVenues } from "../api/fetchVenues";
import { FilterVenues, VenueCard, LoadingSpinner } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Venues() {
  const [venues, setVenues] = useState([]); // Initialize the state with an empty array
  const [page, setPage] = useState(1); // Initialize the page state
  const [loading, setLoading] = useState(false); // Initialize the loading state

  useEffect(() => {
    async function getVenues() {
      setLoading(true);
      try {
        const newVenues = await fetchAllVenues(page);
        setVenues((prevVenues) => [...prevVenues, ...newVenues]); // Append new venues to the existing list
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
    <main
      id="venueContainer"
      className="bg-beige py-8 lg:px-8  max-w-96 px-3 sm:max-w-2xl sm:px-4 md:max-w-3xl md:px-6 lg:max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-black italic">All venues</h2>
      <FilterVenues />
      {loading && page === 1 ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {/* {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))} */}
            {venues.map((venue, index) => (
              <VenueCard key={`${venue.id}-${index}`} venue={venue} />
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
    </main>
  );
}

export default Venues;
