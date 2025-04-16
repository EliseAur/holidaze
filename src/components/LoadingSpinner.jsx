export default function LoadingSpinner() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center mt-15">
      <div className="loader ease-linear rounded-full border-10 border-t-10 border-darkBeige h-20 w-20"></div>
      <div className="text-xl font-bold pt-5">Loading...</div>
    </div>
  );
}
