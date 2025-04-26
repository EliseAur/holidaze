import PropTypes from "prop-types";

/**
 * Modal component renders a modal dialog box.
 * It displays its children content when `isOpen` is true and provides a close button to dismiss the modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open or not.
 * @param {Function} props.onClose - Function to handle closing the modal.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @returns {JSX.Element|null} The modal component or `null` if `isOpen` is false.
 *
 * @example
 * <Modal isOpen={true} onClose={() => setIsOpen(false)}>
 *   <p>Modal Content</p>
 * </Modal>
 */
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
