import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

/**
 * BackToTop component renders a button that scrolls the user back to the top of the page.
 *
 * @component
 * @returns {JSX.Element} A styled anchor link that navigates to the top of the page.
 *
 * @example
 * <BackToTop />
 */
export default function BackToTop() {
  return (
    <a
      href="#top"
      title="Back to top"
      className="ml-2 text-xl mt-8 px-3 py-1 rounded-full border-3 border-black bg-black text-beige hover:bg-black-900 block cursor-pointer"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </a>
  );
}
