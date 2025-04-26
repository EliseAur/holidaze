/**
 * Default values for a venue object.
 * This object provides the initial structure and default values for creating or updating a venue.
 * Used in VenueCreateForm and VenueUpdateForm components.
 */
export const venueDefaultValues = {
  name: "",
  description: "",
  media: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
  price: 0,
  maxGuests: 0,
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  location: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
  },
};
