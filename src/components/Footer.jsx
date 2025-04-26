import FooterWithNoBg from "./FooterWithNoBg";

/**
 * Footer component renders the footer section of the application.
 * It includes a background overlay (bg-palms) and a nested FooterWithNoBg component.
 *
 * @component
 * @returns {JSX.Element} The footer section of the application.
 *
 * @example
 * <Footer />
 */
export default function Footer() {
  return (
    <footer
      className="footerBg p-5 pb-2 text-beige bg-cover bg-center
        bg-no-repeat relative"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="z-10 relative mx-auto">
        <FooterWithNoBg />
      </div>
    </footer>
  );
}
