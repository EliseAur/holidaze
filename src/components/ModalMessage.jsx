import PropTypes from "prop-types";

/**
 * ModalMessage component renders a modal dialog box with a message.
 * It provides options to display confirm and cancel buttons or a single close button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {string} props.message - The message to display in the modal.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} [props.onConfirm] - Function to handle confirmation (optional).
 * @param {boolean} [props.showConfirmButtons] - Whether to show confirm and cancel buttons (optional).
 * @returns {JSX.Element|null} The modal component or `null` if `isOpen` is false.
 *
 * @example
 * <ModalMessage
 *   isOpen={true}
 *   message="Are you sure you want to proceed?"
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={() => handleConfirm()}
 *   showConfirmButtons={true}
 * />
 */
export default function ModalMessage({
  isOpen,
  message,
  onClose,
  onConfirm,
  showConfirmButtons,
}) {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-message fixed inset-0 flex items-center justify-center bg-beige bg-opacity-50 z-50 bg-cover bg-top bg-no-repeat">
      <div className="bg-lightBeige rounded-sm shadow-lg p-6 max-w-sm w-full mx-3 sm:mx-0">
        <p className="text-center text-black font-bold">{message}</p>
        <div className="mt-4 flex justify-center space-x-4">
          {showConfirmButtons ? (
            <>
              <button
                onClick={onConfirm}
                className="bg-lightGreen text-black font-bold py-2 px-4 rounded-sm hover:bg-darkGreen hover:cursor-pointer shadow-custom-dark"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-black font-bold py-2 px-4 rounded-sm hover:bg-gray-400 hover:cursor-pointer shadow-custom-dark"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <button
                onClick={onClose}
                className="bg-black text-lightBeige font-bold py-2 px-4 rounded-sm hover:bg-gray-900 hover:cursor-pointer shadow-custom-dark w-40"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ModalMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  showConfirmButtons: PropTypes.bool,
};
