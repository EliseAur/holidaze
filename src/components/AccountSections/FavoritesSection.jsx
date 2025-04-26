import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { VenueCard } from "../index";
import { ViewMoreButtonAccount } from "../common";

/**
 * FavoritesSection component for displaying a list of favorite venues.
 * Allows users to view their favorite venues and toggle between showing all favorites or a limited number.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Array} props.favoritesToShow - The list of favorite venues to display, sliced based on screen size and `showAllFavorites`.
 * @param {Function} props.handleFavoriteClick - A function to handle adding or removing a venue from favorites.
 * @param {boolean} props.showAllFavorites - A boolean indicating whether all favorite venues should be shown.
 * @param {Function} props.setShowAllFavorites - A function to toggle the `showAllFavorites` state.
 * @param {Array} props.favoriteVenues - The full list of favorite venues, used to calculate the total number of favorites.
 * @returns {JSX.Element} The rendered FavoritesSection component.
 *
 */
export default function FavoritesSection({
  favoritesToShow,
  handleFavoriteClick,
  showAllFavorites,
  setShowAllFavorites,
  favoriteVenues,
}) {
  return (
    <section
      id="favorites"
      className="pt-3 max-w-[360px] sm:max-w-[1279px] px-4 mx-auto"
    >
      <h2 className="text-xl font-black">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
        {favoritesToShow.length > 0 ? (
          favoritesToShow.map((venue) => (
            <div key={venue.id} className="mt-3">
              <VenueCard
                venue={venue}
                isFavorite={true}
                onFavoriteClick={handleFavoriteClick}
              />
            </div>
          ))
        ) : (
          <div className="col-span-2">
            <p>No favorite venues yet..</p>
            <p className="">
              <span>Check out our </span>
              <Link to="/venues" className="font-bold decoration-2 underline">
                beautiful homes
              </Link>
              <span> and start creating your list of favorites ❤</span>
            </p>
          </div>
        )}
      </div>
      <ViewMoreButtonAccount
        isShown={showAllFavorites}
        toggleShown={() => setShowAllFavorites(!showAllFavorites)}
        totalItems={favoriteVenues.length}
        visibleItems={favoritesToShow.length}
        showText="View all favorites"
        hideText="Show less favorites"
      />
      <hr className="mt-6" />
    </section>
  );
}

FavoritesSection.propTypes = {
  favoritesToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
  showAllFavorites: PropTypes.bool.isRequired,
  setShowAllFavorites: PropTypes.func.isRequired,
  favoriteVenues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
