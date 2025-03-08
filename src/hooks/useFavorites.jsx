import { useState, useEffect } from "react";

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

  useEffect(() => {
    console.log("Favorites:", favorites);
  }, [favorites]);

  return { favorites, handleFavoriteClick };
}
