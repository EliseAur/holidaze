import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

/**
 * FooterWithNoBg component renders the footer content without a background.
 * Includes social media links (Facebook, Instagram, YouTube) and copyright information.
 *
 * @component
 * @returns {JSX.Element} The footer content with social media links and copyright text.
 *
 * @example
 * <FooterWithNoBg />
 */
export default function FooterWithNoBg() {
  return (
    <>
      <div className="mx-auto">
        <div className="flex space-x-4 justify-center">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-beige text-shadow text-3xl hover:text-lightGreen"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-beige text-shadow text-3xl hover:text-lightGreen"
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="text-beige text-shadow text-3xl hover:text-lightGreen"
            />
          </a>
        </div>
      </div>
      <div className="z-10 relative text-shadow font-bold text-beige text-center py-4">
        <p>&copy; 2025 Elise Aurtande. All rights reserved.</p>
        <p>Powered by Noroff API.</p>
      </div>
    </>
  );
}
