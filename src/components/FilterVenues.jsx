import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FilterVenuesForm from "./FilterVenuesForm";

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

  useEffect(() => {
    const applyFilters = () => {
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
      // onApplyFilters={applyFilters}
    />
  );
}

FilterVenues.propTypes = {
  venues: PropTypes.array.isRequired, // Array of venues to filter
  onFilter: PropTypes.func.isRequired, // Callback to pass filtered venues to the parent
};
