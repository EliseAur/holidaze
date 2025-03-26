import { useState, useEffect } from "react";
// import { VenueCard } from "../components";
import { fetchProfile, fetchFavorites } from "../api";
import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { useMediaQuery } from "react-responsive";
import {
  VenueCard,
  ProfileUpdateForm,
  VenueCreateForm,
  Modal,
} from "../components";
// import { Modal } from "../components";
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

  const getProfile = async () => {
    try {
      const profileData = await fetchProfile();
      setProfile(profileData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let venuesToShow;
  if (showAllVenues) {
    venuesToShow = profile.venues;
  } else if (isXs) {
    venuesToShow = profile.venues.slice(0, 2);
  } else if (isSm) {
    venuesToShow = profile.venues.slice(0, 2);
  } else if (isMd) {
    venuesToShow = profile.venues.slice(0, 3);
  } else if (isLg) {
    venuesToShow = profile.venues.slice(0, 4);
  } else {
    venuesToShow = profile.venues.slice(0, 4); // Default to 4
  }

  let bookingsToShow;
  if (showAllBookings) {
    bookingsToShow = profile.bookings;
  } else if (isXs) {
    bookingsToShow = profile.bookings.slice(0, 2);
  } else if (isSm) {
    bookingsToShow = profile.bookings.slice(0, 2);
  } else if (isMd) {
    bookingsToShow = profile.bookings.slice(0, 3);
  } else if (isLg) {
    bookingsToShow = profile.bookings.slice(0, 4);
  } else {
    bookingsToShow = profile.bookings.slice(0, 4); // Default to 4
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
          <div className="bg-lightGrey shadow-sm">
            <div className="max-w-[1279px] mx-auto xl:rounded-2xl p-2 xl:p-4">
              <div className="profile-header relative">
                {profile.banner && (
                  <img
                    src={profile.banner.url}
                    alt={profile.banner.alt || "Banner"}
                    className="profile-banner w-full h-38 object-cover rounded-t-2xl"
                  />
                )}
                {profile.avatar && (
                  <div className=" inset-0 absolute flex flex-col top-20 right-1/2 sm:right-1/2 transform max-w-[190px] pl-4 text-black">
                    <img
                      src={profile.avatar.url}
                      alt={profile.avatar.alt || "Avatar"}
                      className="profile-avatar w-28 h-28 rounded-full border-2 border-lightBeige shadow-custom-dark "
                    />
                    <div>
                      <h1 className="font-black text-lg text-left">
                        {profile.name}
                      </h1>
                      <p className="text-sm text-left">{profile.email}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-lightBeige pt-18 sm:pt-10 md:pt-25 pb-4 px-4 text-sm flex justify-between items-center flex-grow rounded-b-2xl shadow-sm">
                <div className="flex flex-col flex-grow max-w-[200px] sm:max-w-[340px] pr-4 mt-auto">
                  <div>
                    <span className="font-black text-black">Bio: </span>
                    <span className="text-black"> {profile.bio}</span>
                  </div>
                  <div className="text-black">
                    <button
                      onClick={openProfileModal}
                      className="bg-black text-xs sm:text-sm text-white font-bold px-4 py-2 rounded mt-2 inline-block hover:bg-gray-900 shadow-custom-dark"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                      Edit profile
                    </button>
                    <Modal
                      isOpen={isProfileModalOpen}
                      onClose={closeProfileModal}
                    >
                      <ProfileUpdateForm
                        onClose={closeProfileModal}
                        onUpdate={getProfile}
                      />
                    </Modal>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row ml-auto mt-auto text-md lg:text-lg sm:space-x-4 underline border-l-1 pl-3 sm:pl-5 border-black text-black font-bold">
                  <Link
                    to="/account"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("hosting")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:decoration-2 cursor-pointer md:my-0 md:pt-3 flex-grow"
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
                    className="hover:decoration-2 cursor-pointer mt-4 md:my-0 md:pt-3 flex-grow"
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
                    className="hover:decoration-2 cursor-pointer my-4 md:my-0 md:mb-0 md:pt-3 flex-grow"
                  >
                    Favorites
                  </Link>

                  {profile.venueManager && (
                    <div className="text-black">
                      <button
                        onClick={openVenueModal}
                        className="bg-lightGreen shadow-custom-dark text-black text-xs sm:text-sm font-bold px-1 sm:px-4 py-2 rounded inline-block hover:bg-darkGreen"
                      >
                        + Add venue
                      </button>
                      <Modal
                        isOpen={isVenueModalOpen}
                        onClose={closeVenueModal}
                      >
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
          <div className="profile-details mt-3 px-2 sm:px-6">
            <section
              id="hosting"
              className="mt-3 pt-5 pb-3 max-w-[1279px] px-2 mx-auto xl:px-8"
            >
              <h2 className="text-xl font-black">Hosting</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
                {profile.venueManager ? (
                  venuesToShow.length > 0 ? (
                    <>
                      {venuesToShow.map((venue) => (
                        <div key={venue.id} className="mt-3">
                          <VenueCard
                            venue={venue}
                            isFavorite={false}
                            onFavoriteClick={handleFavoriteClick}
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
                        <Modal
                          isOpen={isVenueModalOpen}
                          onClose={closeVenueModal}
                        >
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
              {profile.venueManager && profile.venues.length > 2 && (
                <button
                  onClick={() => setShowAllVenues(!showAllVenues)}
                  className="bg-black text-beige font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 block cursor-pointer mx-auto"
                >
                  {showAllVenues
                    ? "Show less venues"
                    : "View all venues you host"}
                </button>
              )}
              <hr className="mt-6" />
            </section>
            <section
              id="bookings"
              className=" py-3 max-w-[1279px] px-2 mx-auto xl:px-8"
            >
              <h2 className="text-xl font-black">Bookings</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
                {bookingsToShow.length > 0 ? (
                  bookingsToShow.map((booking) => {
                    const nights = differenceInDays(
                      new Date(booking.dateTo),
                      new Date(booking.dateFrom),
                    );
                    const totalPrice = booking.venue.price * nights;
                    return (
                      <div
                        key={booking.id}
                        className="booking-card bg-lightBeige rounded-sm shadow-lg mt-2 hover:shadow-custom-dark"
                      >
                        {booking.venue.media.length > 0 && (
                          <Link to={`/venue/${booking.venue.id}`}>
                            <img
                              src={booking.venue.media[0].url}
                              alt={booking.venue.media[0].alt || "Venue image"}
                              className="venue-image w-full h-40 sm:h-56 object-cover rounded-t-sm"
                            />
                          </Link>
                        )}
                        <div className="p-3">
                          <Link to={`/venue/${booking.venue.id}`}>
                            <h4 className="xs:text-lg sm:text-xl font-black underline hover:underline hover:decoration-2 truncate">
                              {booking.venue.name}
                            </h4>
                          </Link>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Dates: </span>
                            {format(
                              new Date(booking.dateFrom),
                              "dd.MM.yy",
                            )} - {format(new Date(booking.dateTo), "dd.MM.yy")}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Nights: </span>
                            {nights}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Guests: </span>
                            {booking.guests}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Total price: </span>
                            {totalPrice}$
                          </p>
                          <Link
                            to={`/venue/${booking.venue.id}`}
                            className="text-sm bg-lightGreen text-black text-center font-bold py-1 rounded mt-2 shadow-custom-dark hover:bg-darkGreen block cursor-pointer"
                          >
                            Venue Details
                          </Link>
                        </div>
                      </div>
                    );
                  })
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
              {profile.bookings.length > 2 && (
                <button
                  onClick={() => setShowAllBookings(!showAllBookings)}
                  className="bg-black text-beige font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 block cursor-pointer w-[170px] mx-auto"
                >
                  {showAllBookings ? "Show less bookings" : "View all bookings"}
                </button>
              )}
              <hr className="mt-6" />
            </section>
            <section
              id="favorites"
              className=" pt-3 pb-6 mb-4 max-w-[1279px] px-2 mx-auto xl:px-8"
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
              {favoriteVenues.length > 2 && (
                <button
                  onClick={() => setShowAllFavorites(!showAllFavorites)}
                  className="bg-black text-beige font-bold py-2 px-4 rounded mt-8 shadow-custom-dark hover:bg-gray-900 block cursor-pointer w-[170px] mx-auto"
                >
                  {showAllFavorites
                    ? "Show less favorites"
                    : "View all favorites"}
                </button>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
