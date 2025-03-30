export default function BookingConfirmation({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
      <p className="text-lg mb-2">Thank you for your booking!</p>
      <button
        onClick={onClose}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Close
      </button>
    </div>
  );
}
