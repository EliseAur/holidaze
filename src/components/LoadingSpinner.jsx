import React from "react";
/**
 * LoadingSpinner component renders a loading spinner with a "Loading..." message.
 * It is used to indicate that content is being loaded.
 *
 * @component
 * @returns {JSX.Element} A loading spinner with a message.
 *
 * @example
 * <LoadingSpinner />
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center mt-15">
      <div className="loader ease-linear rounded-full border-10 border-t-10 border-darkBeige h-20 w-20"></div>
      <div className="text-xl font-bold pt-5">Loading...</div>
    </div>
  );
}
