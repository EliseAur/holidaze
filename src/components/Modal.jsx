import PropTypes from "prop-types";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 z-100 overflow-auto flex justify-center items-center bg-cover bg-top bg-no-repeat">
      <div className="bg-beige p-0 rounded-sm shadow-lg  mx-auto relative max-w-[500px] w-full">
        <button
          className="absolute top-3 right-7 text-black text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="overflow-y-auto max-h-[100vh] md:max-h[80vh] pt-5 px-2 sm:px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
