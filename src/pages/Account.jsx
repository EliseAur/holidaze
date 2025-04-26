import { useState, useEffect } from "react";
import { fetchFavorites } from "../api";
import { useFavorites } from "../hooks/useFavorites";
import { LoadingSpinner, ProfileCard } from "../components";
import {
  HostingSection,
  BookingSection,
  FavoritesSection,
} from "../components/AccountSections";
import { BackToTop, ErrorBox } from "../components/common";
import useSEO from "../hooks/useSEO";
import useProfile from "../hooks/useProfile";
import useBreakpoints from "../hooks/useBreakpoints";
import {
  sortVenuesByCreated,
  sortBookingsByDate,
  filterUpcomingBookings,
  sliceItemsByScreenSize,
} from "../utils";

/**
 * Account component for managing and displaying user account details.
 * Includes sections for hosting venues, upcoming bookings, and favorite venues.
 * Allows users to edit their profile, manage venues, and view bookings.
 *
 * @component
 * @returns {JSX.Element} The rendered Account component.
 *
 * @example
 * <Account />
 */
export default function Account() {
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

  const { isXs, isSm, isMd, isLg } = useBreakpoints();

  useSEO({
    title: "Holidaze | Account",
    description:
      "Manage your Holidaze account. Edit your profile, register as a host, create and manage venues, view bookings for your hosted venues, and check bookings you've made to other venues.",
    keywords:
      "account management, edit profile, host venues, create venues, manage bookings, favorite venues, Holidaze",
  });

  const { profile, loading, error, getProfile } = useProfile();

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
    return <ErrorBox message={error} />;
  }

  const sortedVenues = sortVenuesByCreated(profile.venues);
  const venuesToShow = sliceItemsByScreenSize(
    sortedVenues,
    showAllVenues,
    isXs,
    isSm,
    isMd,
    isLg,
  );

  const sortedBookings = sortBookingsByDate(profile.bookings);
  const upcomingBookings = filterUpcomingBookings(sortedBookings);
  const bookingsToShow = sliceItemsByScreenSize(
    upcomingBookings,
    showAllBookings,
    isXs,
    isSm,
    isMd,
    isLg,
  );

  const favoritesToShow = sliceItemsByScreenSize(
    favoriteVenues,
    showAllFavorites,
    isXs,
    isSm,
    isMd,
    isLg,
  );

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
            <HostingSection
              profile={profile}
              venuesToShow={venuesToShow}
              handleFavoriteClick={handleFavoriteClick}
              openVenueModal={openVenueModal}
              closeVenueModal={closeVenueModal}
              isVenueModalOpen={isVenueModalOpen}
              getProfile={getProfile}
              showAllVenues={showAllVenues}
              setShowAllVenues={setShowAllVenues}
              openProfileModal={openProfileModal}
            />
            <BookingSection
              bookingsToShow={bookingsToShow}
              showAllBookings={showAllBookings}
              setShowAllBookings={setShowAllBookings}
              upcomingBookings={upcomingBookings}
            />
            <FavoritesSection
              favoritesToShow={favoritesToShow}
              handleFavoriteClick={handleFavoriteClick}
              showAllFavorites={showAllFavorites}
              setShowAllFavorites={setShowAllFavorites}
              favoriteVenues={favoriteVenues}
            />
            <div className="flex justify-center items-center mx-auto">
              <BackToTop />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
