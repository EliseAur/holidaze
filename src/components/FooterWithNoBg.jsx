import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function FooterWithNoBg() {
  return (
    <footer className="py-6 px-4 text-beige">
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
      <div className="z-10 relative text-shadow font-bold text-center py-4">
        &copy; 2025 Elise Aurtande, Inc. All rights reserved
      </div>
    </footer>
  );
}
