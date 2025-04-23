import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ProfileUpdateForm, VenueCreateForm } from "./index";
import placeholderImage from "../images/placeholder-profile-img.jpg";

export default function ProfileCard({
  profile,
  openProfileModal,
  closeProfileModal,
  isProfileModalOpen,
  openVenueModal,
  closeVenueModal,
  isVenueModalOpen,
  getProfile,
}) {
  return (
    <div className="bg-lightBeige shadow-md">
      <div className="xl:rounded-2xl sm:max-w-[1279px] mx-auto sm:px-8 xl:px-2">
        <div className="profile-header relative">
          {profile.banner &&
          profile.banner.url.includes(
            "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
          ) ? (
            <div
              className="profile-banner w-full h-38 md:h-46 sm:rounded-b-2xl shadow-sm"
              style={{ background: "var(--gradient-gradientGreen)" }}
            ></div>
          ) : (
            profile.banner && (
              <img
                src={profile.banner.url}
                alt={profile.banner.alt || "Profile banner"}
                className="profile-banner w-full h-38 md:h-46 object-cover sm:rounded-b-2xl "
              />
            )
          )}
          <div className="inset-0 absolute flex flex-col top-20 md:top-24 right-1/2 sm:right-1/2 transform max-w-[340px] pl-4 text-black md:ml-5">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-lightBeige">
              <img
                src={
                  profile.avatar &&
                  profile.avatar.url.includes(
                    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
                  )
                    ? placeholderImage
                    : profile.avatar.url
                }
                alt={
                  profile.avatar &&
                  profile.avatar.url.includes(
                    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
                  )
                    ? "Profile placeholder image"
                    : profile.avatar.alt || "Profile placeholder image"
                }
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-lightBeige shadow-custom-dark"
              />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <h1 className="font-black text-xl text-left mt-2 inline-block">
                  {profile.name}
                </h1>
                {profile.venueManager && (
                  <p className="text-black text-xs italic font-bold sm:ml-1 -mt-1 mb-1 sm:my-0 sm:pt-2">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="text-darkGreen"
                    />
                    Certified host
                  </p>
                )}
              </div>
              <p className="text-sm text-left font-bold">{profile.email}</p>
              <div className="mt-5">
                <span className="font-black text-black text-md">Bio: </span>
                <span className="text-black text-md break-words">
                  {profile.bio}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lightBeige lg:pt-30 py-4 px-4 text-sm flex justify-between items-center flex-grow rounded-b-2xl">
          <div className="flex flex-col lg:flex-row text-lg lg:text-lg sm:space-x-4 underline border-l-1 pl-3 sm:pl-5 lg:mr-5 ml-auto border-black text-black font-bold">
            <Link
              to="/account"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("hosting")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:decoration-2 cursor-pointer md:my-0 md:pt-2 lg:pt-4 flex-grow"
            >
              Hosting
            </Link>
            <Link
              to="/account"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("bookings")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:decoration-2 cursor-pointer mt-2 md:my-0 md:pt-2 lg:pt-4 flex-grow"
            >
              Bookings
            </Link>
            <Link
              to="/account"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("favorites")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:decoration-2 cursor-pointer mt-2 mb-1 md:my-0 md:mb-0 md:pt-2 lg:pt-4 flex-grow"
            >
              Favorites
            </Link>
            <div className="text-black">
              <button
                onClick={openProfileModal}
                className="bg-black text-sm text-white font-bold px-4 py-2 rounded mb-2 mt-6 lg:mt-3 inline-block hover:bg-gray-900 shadow-custom-dark w-full sm:max-w-[124px]"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                Edit profile
              </button>
              <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
                <ProfileUpdateForm
                  onClose={closeProfileModal}
                  onUpdate={getProfile}
                />
              </Modal>
            </div>

            {profile.venueManager && (
              <div className="text-black">
                <button
                  onClick={openVenueModal}
                  className="bg-lightGreen shadow-custom-dark text-black text-sm font-bold px-4 py-2 mb-2 mt-1 lg:mt-3 rounded inline-block hover:bg-darkGreen w-full sm:max-w-[124px]"
                >
                  + Add venue
                </button>
                <Modal isOpen={isVenueModalOpen} onClose={closeVenueModal}>
                  <VenueCreateForm
                    onClose={closeVenueModal}
                    onUpdate={getProfile}
                  />
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    avatar: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string,
    venueManager: PropTypes.bool,
  }).isRequired,
  openProfileModal: PropTypes.func.isRequired,
  closeProfileModal: PropTypes.func.isRequired,
  isProfileModalOpen: PropTypes.bool.isRequired,
  openVenueModal: PropTypes.func.isRequired,
  closeVenueModal: PropTypes.func.isRequired,
  isVenueModalOpen: PropTypes.bool.isRequired,
  getProfile: PropTypes.func.isRequired,
};
