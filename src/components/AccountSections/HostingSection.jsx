import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { VenueCard, Modal, VenueCreateForm } from "../index";
import { ViewMoreButtonAccount } from "../common";

/**
 * HostingSection component for displaying a list of venues hosted by the user.
 * Allows users to view their hosted venues and provides options to add a new venue
 * or register as a host if they are not already one.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.profile - The user's profile data.
 * @param {boolean} props.profile.venueManager - Indicates if the user is a venue manager.
 * @param {Array} props.profile.venues - The list of venues hosted by the user.
 * @param {Array} props.venuesToShow - The list of venues to display, sliced based on screen size and `showAllVenues`.
 * @param {Function} props.handleFavoriteClick - A function to handle adding or removing a venue from favorites.
 * @param {Function} props.openVenueModal - A function to open the modal for adding a new venue.
 * @param {Function} props.closeVenueModal - A function to close the modal for adding a new venue.
 * @param {Function} props.getProfile - A function to refresh the user's profile data.
 * @param {boolean} props.showAllVenues - A boolean indicating whether all hosted venues should be shown.
 * @param {Function} props.setShowAllVenues - A function to toggle the `showAllVenues` state.
 * @param {Function} props.openProfileModal - A function to open the profile modal for registering as a host.
 * @returns {JSX.Element} The rendered HostingSection component.
 *
 * @example
 * <HostingSection
 *   profile={profile}
 *   venuesToShow={venuesToShow}
 *   handleFavoriteClick={handleFavoriteClick}
 *   openVenueModal={openVenueModal}
 *   closeVenueModal={closeVenueModal}
 *   getProfile={getProfile}
 *   showAllVenues={showAllVenues}
 *   setShowAllVenues={setShowAllVenues}
 *   openProfileModal={openProfileModal}
 * />
 */
export default function HostingSection({
  profile,
  venuesToShow,
  handleFavoriteClick,
  openVenueModal,
  closeVenueModal,
  getProfile,
  showAllVenues,
  setShowAllVenues,
  openProfileModal,
}) {
  return (
    <section
      id="hosting"
      className="mt-3 pt-5 pb-3 max-w-[360px] sm:max-w-[1279px] px-4 mx-auto"
    >
      <h2 className="text-xl font-black">Hosting</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
        {profile.venueManager ? (
          venuesToShow.length > 0 ? (
            <>
              <p className="col-span-full">
                Click the <span className="font-black">Manage Venue</span>{" "}
                button to <span className="font-black">delete</span>,{" "}
                <span className="font-black">update</span> or to view the{" "}
                <span className="font-black">list of bookings</span> for your
                venues.
              </p>
              {venuesToShow.map((venue) => (
                <div key={venue.id} className="mt-3">
                  <VenueCard
                    venue={venue}
                    isFavorite={false}
                    onFavoriteClick={handleFavoriteClick}
                    isHostedByUser={true}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col col-span-full">
              <p>You are not currently hosting any venues.</p>
              <p>Do something about that.</p>

              <div className="text-black">
                <button
                  onClick={openVenueModal}
                  className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-2 inline-block hover:bg-darkGreen cursor-pointer"
                >
                  + Add a venue
                </button>
                <Modal onClose={closeVenueModal}>
                  <VenueCreateForm
                    onClose={closeVenueModal}
                    onUpdate={getProfile}
                  />
                </Modal>
              </div>
            </div>
          )
        ) : (
          <div>
            <p>You are not registered as a host.</p>
            <p>Edit profile to register.</p>
            <button
              onClick={openProfileModal}
              className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-2 inline-block hover:bg-darkGreen cursor-pointer"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
              Edit profile
            </button>
          </div>
        )}
      </div>
      <ViewMoreButtonAccount
        isShown={showAllVenues}
        toggleShown={() => setShowAllVenues(!showAllVenues)}
        totalItems={profile.venues.length}
        visibleItems={venuesToShow.length}
        showText="View all venues you host"
        hideText="Show less venues"
      />
      <hr className="mt-6" />
    </section>
  );
}

HostingSection.propTypes = {
  profile: PropTypes.shape({
    venueManager: PropTypes.bool.isRequired,
    venues: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  venuesToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
  openVenueModal: PropTypes.func.isRequired,
  closeVenueModal: PropTypes.func.isRequired,
  isVenueModalOpen: PropTypes.bool.isRequired,
  getProfile: PropTypes.func.isRequired,
  showAllVenues: PropTypes.bool.isRequired,
  setShowAllVenues: PropTypes.func.isRequired,
  openProfileModal: PropTypes.func.isRequired,
};
