import PropTypes from "prop-types";

export default function VenueSuccessMsg({ title, message, onClose }) {
  return (
    <div className="text-center p-5 pb-8">
      <h2 className="text-2xl font-black text-black mb-3">{title}</h2>
      <p className="text-md text-black font-bold">{message}</p>
      <button
        onClick={onClose}
        className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen cursor-pointer"
      >
        Close
      </button>
    </div>
  );
}

VenueSuccessMsg.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
