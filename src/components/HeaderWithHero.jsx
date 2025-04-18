import PropTypes from "prop-types";
import Header from "./Header";
import Hero from "./Hero";

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
