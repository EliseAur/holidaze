import PropTypes from "prop-types";

export default function ViewMoreButtonAccount({
  isShown,
  toggleShown,
  totalItems,
  visibleItems,
  showText,
  hideText,
}) {
  // Only show the button if there are more items than the visible ones
  if (totalItems <= (isShown ? 0 : visibleItems)) {
    return null;
  }

  return (
    <button
      onClick={toggleShown}
      className="bg-black text-beige font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 block cursor-pointer mx-auto"
    >
      {isShown ? hideText : showText}
    </button>
  );
}

ViewMoreButtonAccount.propTypes = {
  isShown: PropTypes.bool.isRequired, // State to determine if all items are shown
  toggleShown: PropTypes.func.isRequired, // Function to toggle the state
  totalItems: PropTypes.number.isRequired, // Total number of items
  visibleItems: PropTypes.number.isRequired, // Number of currently visible items
  showText: PropTypes.string.isRequired, // Text to display when items are hidden
  hideText: PropTypes.string.isRequired, // Text to display when all items are shown
};
