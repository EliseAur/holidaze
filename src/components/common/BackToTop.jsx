import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
