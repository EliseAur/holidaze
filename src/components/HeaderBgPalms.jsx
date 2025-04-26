import Header from "./Header";

/**
 * HeaderBgPalms component renders the header section with a background image and an overlay.
 * It includes the Header component nested within.
 *
 * @component
 * @returns {JSX.Element} The header section with a background image and overlay.
 *
 * @example
 * <HeaderBgPalms />
 */
export default function HeaderBgPalms() {
  return (
    <div
      className="headerNavBox bg-cover bg-bottom
         bg-no-repeat bg-fixed relative pb-2 pt-1"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
    </div>
  );
}
