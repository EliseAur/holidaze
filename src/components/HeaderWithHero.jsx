import PropTypes from "prop-types";
import Header from "./Header";
import Hero from "./Hero";

/**
 * HeaderWithHero component renders a full-screen header section with a background image, an overlay, and a hero section.
 * It includes the Header component and passes venue data to the Hero component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.allVenues - An array of venue objects to be displayed in the Hero component.
 * @param {string} props.allVenues[].id - The unique ID of the venue.
 * @param {string} props.allVenues[].name - The name of the venue.
 * @returns {JSX.Element} The header section with a hero component.
 *
 * @example
 * const venues = [
 *   { id: "1", name: "Luxury Villa" },
 *   { id: "2", name: "Cozy Cabin" },
 * ];
 * <HeaderWithHero allVenues={venues} />
 */
export default function HeaderWithHero({ allVenues }) {
  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed h-screen relative pb-2 pt-1"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
      <Hero allVenues={allVenues} />
    </div>
  );
}

HeaderWithHero.propTypes = {
  allVenues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Venue ID
      name: PropTypes.string.isRequired, // Venue name
    }),
  ).isRequired, // allVenues must be an array of objects with id and name
};
