import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * Hero component renders a hero section with a search bar, suggestions, and a call-to-action button.
 * It allows users to search for venues and navigate to specific venue details.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.allVenues - An array of venue objects to be displayed in the suggestions.
 * @param {string} props.allVenues[].id - The unique ID of the venue.
 * @param {string} props.allVenues[].name - The name of the venue.
 * @returns {JSX.Element} The hero section with a search bar, suggestions, and a call-to-action button.
 *
 * @example
 * const venues = [
 *   { id: "1", name: "Luxury Villa" },
 *   { id: "2", name: "Cozy Cabin" },
 * ];
 * <Hero allVenues={venues} />
 */
export default function Hero({ allVenues }) {
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [filteredVenues, setFilteredVenues] = useState([]); // Filtered venues for suggestions
  const navigate = useNavigate();

  /**
   * Handles changes to the search input and filters venues based on the query.
   *
   * @param {Object} e - The input change event.
   */
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter venues based on the search query
    if (query) {
      const suggestions = allVenues.filter((venue) =>
        venue.name.toLowerCase().includes(query),
      );
      setFilteredVenues(suggestions);
    } else {
      setFilteredVenues([]); // Clear suggestions if query is empty
    }
  };

  /**
   * Handles venue click and navigates to the venue detail page.
   *
   * @param {string} venueId - The ID of the clicked venue.
   */
  const handleVenueClick = (venueId) => {
    navigate(`/venue/${venueId}`); // Navigate to the VenueDetail page
  };

  return (
    <div className="text-beige relative z-10 text-center">
      <div className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-shadow text-4xl sm:text-5xl lg:text-6xl font-black italic ">
          Find Your Perfect Getaway
        </h1>
        <div className="font-bold text-shadow mt-4 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto">
          <p>Book unique stays in stunning destinations</p>
          <p>
            Or share your home with the world by register as a host and earn
            from your space.
          </p>
        </div>
        <div className="max-w-[300px] mx-auto">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("venueContainer")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full mt-8 inline-block bg-lightGreen text-black font-bold px-6 py-2 rounded-sm text-lg shadow-custom-dark hover:bg-darkGreen"
          >
            Latest venues
          </Link>
          <div className="flex mt-4 w-full">
            <input
              type="text"
              placeholder="Search for venues..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow w-full sm:w-auto py-2 px-3 rounded-l-sm focus:outline-none input-inner-shadow bg-zinc-800/50 bg-opacity-90 border-beige border-2 text-beige placeholder-stone-400 shadow-custom-dark"
            />
            <button className="bg-beige text-lg text-black font-bold px-3 py-2 rounded-r-sm hover:bg-lightBeige">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {/* Suggested Venues */}
          {filteredVenues.length > 0 && (
            <ul className="bg-beige shadow-md rounded mt-2 max-h-60 overflow-y-auto text-black">
              {filteredVenues.map((venue) => (
                <li
                  key={venue.id}
                  className="p-2 hover:bg-white cursor-pointer truncate text-left font-bold pl-3"
                  onClick={() => handleVenueClick(venue.id)}
                >
                  {venue.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Add PropTypes for validation
Hero.propTypes = {
  allVenues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Venue ID
      name: PropTypes.string.isRequired, // Venue name
    }),
  ).isRequired, // allVenues must be an array of objects with id and name
};
