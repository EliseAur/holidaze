import { useState, useEffect } from "react";
import { fetchProfile, fetchFavorites } from "../api";
import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  LoadingSpinner,
  VenueCard,
  VenueCreateForm,
  Modal,
  ProfileCard,
  BookingCard,
} from "../components";
import {
  BackToTop,
  ViewMoreButtonAccount,
  ErrorBox,
} from "../components/common";
import useSEO from "../hooks/useSEO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, handleFavoriteClick } = useFavorites(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openVenueModal = () => setIsVenueModalOpen(true);
  const closeVenueModal = () => setIsVenueModalOpen(false);

  const isXs = useMediaQuery({ maxWidth: 575 });
  const isSm = useMediaQuery({ minWidth: 576, maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLg = useMediaQuery({ minWidth: 992 });

  useSEO({
    title: "Holidaze | Account",
    description:
      "Manage your Holidaze account. Edit your profile, register as a host, create and manage venues, view bookings for your hosted venues, and check bookings you've made to other venues.",
    keywords:
      "account management, edit profile, host venues, create venues, manage bookings, favorite venues, Holidaze",
  });

  // Fetch profile data
  const getProfile = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true); // Only show the spinner if needed
      setError(null); // Reset error state
      const profileData = await fetchProfile();
      setProfile(profileData);
    } catch (error) {
      setError(
        `Failed to load your account. Please try again later. ${error.message}`,
      );
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const fetchFavoriteVenues = async () => {
      try {
        const fetchedVenues = await fetchFavorites();
        setFavoriteVenues(fetchedVenues);
      } catch (error) {
        console.error("Error fetching favorite venues:", error);
      }
    };

    fetchFavoriteVenues();
  }, [favorites]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // return <div>Error: {error}</div>;
    return <ErrorBox message={error} />;
  }

  let venuesToShow;
  const sortedVenues = profile.venues.slice().sort(
    (a, b) => new Date(b.created) - new Date(a.created), // Sort by created date (descending)
  );

  if (showAllVenues) {
    venuesToShow = sortedVenues; // Show all sorted venues
  } else if (isXs) {
    venuesToShow = sortedVenues.slice(0, 2); // Show top 2 for extra small screens
  } else if (isSm) {
    venuesToShow = sortedVenues.slice(0, 2); // Show top 2 for small screens
  } else if (isMd) {
    venuesToShow = sortedVenues.slice(0, 3); // Show top 3 for medium screens
  } else if (isLg) {
    venuesToShow = sortedVenues.slice(0, 4); // Show top 4 for large screens
  } else {
    venuesToShow = sortedVenues.slice(0, 4); // Default to top 4
  }

  let bookingsToShow;

  // Sort bookings by dateFrom (earliest first)
  const sortedBookings = profile.bookings
    .slice() // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)); // Sort by dateFrom (ascending)

  // Optionally filter out past bookings
  const upcomingBookings = sortedBookings.filter(
    (booking) => new Date(booking.dateFrom) >= new Date(), // Only include bookings with dateFrom in the future
  );

  if (showAllBookings) {
    bookingsToShow = upcomingBookings; // Show all upcoming bookings
  } else if (isXs) {
    bookingsToShow = upcomingBookings.slice(0, 2); // Show top 2 for extra small screens
  } else if (isSm) {
    bookingsToShow = upcomingBookings.slice(0, 2); // Show top 2 for small screens
  } else if (isMd) {
    bookingsToShow = upcomingBookings.slice(0, 3); // Show top 3 for medium screens
  } else if (isLg) {
    bookingsToShow = upcomingBookings.slice(0, 4); // Show top 4 for large screens
  } else {
    bookingsToShow = upcomingBookings.slice(0, 4); // Default to top 4
  }

  let favoritesToShow;
  if (showAllFavorites) {
    favoritesToShow = favoriteVenues;
  } else if (isXs) {
    favoritesToShow = favoriteVenues.slice(0, 2);
  } else if (isSm) {
    favoritesToShow = favoriteVenues.slice(0, 2);
  } else if (isMd) {
    favoritesToShow = favoriteVenues.slice(0, 3);
  } else if (isLg) {
    favoritesToShow = favoriteVenues.slice(0, 4);
  } else {
    favoritesToShow = favoriteVenues.slice(0, 4); // Default to 4
  }

  return (
    <div className="profile-page ">
      {profile && (
        <div>
          <ProfileCard
            profile={profile}
            openProfileModal={openProfileModal}
            closeProfileModal={closeProfileModal}
            isProfileModalOpen={isProfileModalOpen}
            openVenueModal={openVenueModal}
            closeVenueModal={closeVenueModal}
            isVenueModalOpen={isVenueModalOpen}
            getProfile={getProfile}
          />
          <div className="profile-details mt-3 px-2 sm:px-6 pb-8">
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
                        Click the{" "}
                        <span className="font-black">Manage Venue</span> button
                        to <span className="font-black">delete</span>,{" "}
                        <span className="font-black">update</span> or to view
                        the <span className="font-black">list of bookings</span>{" "}
                        for your venues.
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
                          className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-2 inline-block hover:bg-darkGreen"
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
                      className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-2 inline-block hover:bg-darkGreen"
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
            <section
              id="bookings"
              className=" py-3 max-w-[360px] sm:max-w-[1279px] px-4 mx-auto"
            >
              <h2 className="text-xl font-black">Upcoming bookings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
                {bookingsToShow.length > 0 ? (
                  bookingsToShow.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <div className="col-span-2">
                    <p>You have no bookings yet.</p>
                    <p className="">
                      <span>Check out our </span>
                      <Link
                        to="/venues"
                        className=" font-bold decoration-2 underline"
                      >
                        venues
                      </Link>
                      <span> and get your first booking today!</span>
                    </p>
                  </div>
                )}
              </div>
              <ViewMoreButtonAccount
                isShown={showAllBookings}
                toggleShown={() => setShowAllBookings(!showAllBookings)}
                totalItems={upcomingBookings.length}
                visibleItems={bookingsToShow.length}
                showText="View all bookings"
                hideText="Show less bookings"
              />
              <hr className="mt-6" />
            </section>
            <section
              id="favorites"
              className="pt-3 max-w-[360px] sm:max-w-[1279px] px-4 mx-auto"
            >
              <h2 className="text-xl font-black">Favorites</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 ">
                {favoritesToShow.length > 0 ? (
                  favoritesToShow.map((venue) => (
                    <div key={venue.id} className="mt-3">
                      <VenueCard
                        venue={venue}
                        isFavorite={true}
                        onFavoriteClick={handleFavoriteClick}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2">
                    <p>No favorite venues yet..</p>
                    <p className="">
                      <span>Check out our </span>
                      <Link
                        to="/venues"
                        className=" font-bold decoration-2 underline"
                      >
                        beautiful homes
                      </Link>
                      <span> and start creating your list of favorites ❤</span>
                    </p>
                  </div>
                )}
              </div>
              <ViewMoreButtonAccount
                isShown={showAllFavorites}
                toggleShown={() => setShowAllFavorites(!showAllFavorites)}
                totalItems={favoriteVenues.length}
                visibleItems={favoritesToShow.length}
                showText="View all favorites"
                hideText="Show less favorites"
              />
              <hr className="mt-6" />
            </section>
            <div className="flex justify-center items-center mx-auto">
              <BackToTop />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
