export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pb-20"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.87)" }}
    >
      <div className="bg-beige p-6 rounded-sm shadow-lg  mx-5 relative max-w-[500px] w-full">
        <button
          className="absolute top-1 right-4 text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-black mb-2">Edit profile</h2>
        {children}
      </div>
    </div>
  );
}
