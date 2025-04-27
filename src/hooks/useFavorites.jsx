import { useState, useEffect } from "react";

/**
 * Custom hook to manage favorite venues.
 * Retrieves favorites from local storage and provides a function to handle adding or removing venues from favorites.
 *
 * @param {boolean} isLoggedIn - Indicates whether the user is logged in.
 * @returns {Object} An object containing:
 * - `favorites` {Array<string>} - The list of favorite venue IDs.
 * - `handleFavoriteClick` {Function} - A function to add or remove a venue from favorites.
 *
 * @example
 * const { favorites, handleFavoriteClick } = useFavorites(isLoggedIn);
 *
 * handleFavoriteClick("venueId123"); // Adds or removes the venue with ID "venueId123" from favorites.
 */
export function useFavorites(isLoggedIn) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleFavoriteClick = (venueId) => {
    if (!isLoggedIn) {
      alert("You need to be logged in to favorite a venue.");
      return;
    }
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(venueId)) {
        updatedFavorites = prevFavorites.filter((id) => id !== venueId);
      } else {
        updatedFavorites = [...prevFavorites, venueId];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return { favorites, handleFavoriteClick };
}
