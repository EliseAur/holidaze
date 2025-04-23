import PropTypes from "prop-types";

export default function ErrorBox({ message }) {
  return (
    <div
      className="bg-red-100 border-2 border-red-700 text-red-700 px-4 py-3 rounded relative max-w-[400px] mx-auto my-7"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired, // The error message to display
};
