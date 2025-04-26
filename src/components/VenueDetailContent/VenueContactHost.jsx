import PropTypes from "prop-types";
import placeholderImage from "../../images/placeholder-profile-img.jpg";

/**
 * VenueContactHost component displays the contact information of the venue's host,
 * including their name, email, and avatar image.
 * If the avatar image is missing or matches a placeholder URL, a default placeholder image is displayed.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.owner - The owner of the venue.
 * @param {string} props.owner.name - The name of the venue owner.
 * @param {string} props.owner.email - The email of the venue owner.
 * @param {Object} props.owner.avatar - The avatar of the venue owner.
 * @param {string} props.owner.avatar.url - The URL of the avatar image.
 * @param {string} [props.owner.avatar.alt] - The alt text for the avatar image.
 * @returns {JSX.Element} The rendered VenueContactHost component.
 */
export default function VenueContactHost({ owner }) {
  return (
    <div className="min-w-[258.3px] w-full bg-lightBeige rounded-sm shadow-sm p-5 mt-3 sm:ml-1">
      <h2 className="text-md sm:text-lg font-black">Contact host</h2>
      <div>
        <img
          src={
            owner.avatar &&
            owner.avatar.url.includes(
              "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
            )
              ? placeholderImage
              : owner.avatar.url
          }
          alt={
            owner.avatar &&
            owner.avatar.url.includes(
              "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
            )
              ? "Profile placeholder image"
              : owner.avatar.alt || "Profile placeholder image"
          }
          className="w-15 h-15 rounded-full mt-3 border-1 border-white shadow-sm"
        />
      </div>
      <p className="mt-3 font-bold">{owner.name}</p>
      <p>{owner.email}</p>
    </div>
  );
}

VenueContactHost.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
