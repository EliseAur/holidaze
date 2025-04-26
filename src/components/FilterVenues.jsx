import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FilterVenuesForm from "./FilterVenuesForm";

/**
 * FilterVenues component provides filtering and search functionality for a list of venues.
 * Allows users to filter venues by various criteria such as parking, pets, WiFi, breakfast, guests, and price.
 * Passes the filtered venues back to the parent component via the `onFilter` callback.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.venues - The array of venues to filter.
 * @param {Function} props.onFilter - Callback function to pass the filtered venues to the parent component.
 * @returns {JSX.Element} A form for filtering venues.
 *
 * @example
 * const venues = [
 *   { name: "Luxury Villa", meta: { parking: true, pets: false }, price: 100, maxGuests: 4 },
 *   { name: "Cozy Cabin", meta: { parking: false, pets: true }, price: 50, maxGuests: 2 },
 * ];
 * const handleFilter = (filteredVenues) => {
 *   console.log("Filtered Venues:", filteredVenues);
 * };
 * <FilterVenues venues={venues} onFilter={handleFilter} />;
 */
export default function FilterVenues({ venues, onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    parking: false,
    pets: false,
    wifi: false,
    breakfast: false,
    guests: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetFilters = () => {
    setFilters({
      parking: false,
      pets: false,
      wifi: false,
      breakfast: false,
      guests: "",
      price: "",
    });
    setSearchQuery("");
    onFilter(null); // Pass the default venues to the parent
  };

  useEffect(() => {
    const applyFilters = () => {
      if (!searchQuery && Object.values(filters).every((value) => !value)) {
        // No filters or search query, do nothing
        return;
      }
      const filteredVenues = venues.filter((venue) => {
        // Search by name, description, location, country, or city
        const matchesSearch =
          venue.name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Check name
          venue.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) || // Check description
          venue.location?.country
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) || // Check country
          venue.location?.city
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()); // Check city

        // Filter by checkboxes
        const matchesFilters =
          (!filters.parking || venue.meta.parking) &&
          (!filters.pets || venue.meta.pets) &&
          (!filters.wifi || venue.meta.wifi) &&
          (!filters.breakfast || venue.meta.breakfast);

        // Filter by guests
        const matchesGuests =
          !filters.guests ||
          (filters.guests === "5"
            ? venue.maxGuests > 4
            : venue.maxGuests === parseInt(filters.guests));

        // Filter by price
        const matchesPrice =
          !filters.price ||
          (filters.price === "low" && venue.price < 50) ||
          (filters.price === "medium" &&
            venue.price >= 50 &&
            venue.price <= 100) ||
          (filters.price === "high" && venue.price > 100);

        return matchesSearch && matchesFilters && matchesGuests && matchesPrice;
      });

      onFilter(filteredVenues);
    };
    applyFilters(); // Call applyFilters whenever searchQuery or filters change
  }, [searchQuery, filters, venues, onFilter]); // Dependencies: re-run when these change

  return (
    <FilterVenuesForm
      searchQuery={searchQuery}
      filters={filters}
      onSearchChange={handleSearchChange}
      onInputChange={handleInputChange}
      onResetFilters={resetFilters}
    />
  );
}

FilterVenues.propTypes = {
  venues: PropTypes.array.isRequired, // Array of venues to filter
  onFilter: PropTypes.func.isRequired, // Callback to pass filtered venues to the parent
};
