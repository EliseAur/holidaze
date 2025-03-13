import { useState, useEffect } from "react";
import { VenueCard } from "../components";
import { fetchProfile, fetchFavorites } from "../api";
import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { useMediaQuery } from "react-responsive";

export default function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { favorites, handleFavoriteClick } = useFavorites(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showAllFavorites, setShowAllFavorites] = useState(false);

  const isXs = useMediaQuery({ maxWidth: 575 });
  const isSm = useMediaQuery({ minWidth: 576, maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLg = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
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

    getProfile();
  }, []);

  useEffect(() => {
    const fetchFavoriteVenues = async () => {
      const fetchedVenues = await fetchFavorites();
      setFavoriteVenues(fetchedVenues);
    };

    fetchFavoriteVenues();
  }, [favorites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
    <div className="profile-page max-w-[1200px] mx-auto p-2 lg:p-4">
      {profile && (
        <div>
          <div className="profile-header relative">
            {profile.banner && (
              <img
                src={profile.banner.url}
                alt={profile.banner.alt || "Banner"}
                className="profile-banner rounded-sm shadow-sm w-full h-48 object-cover"
              />
            )}
            {profile.avatar && (
              <div className="absolute inset-0 flex flex-col items-center justify-center font-bold">
                <img
                  src={profile.avatar.url}
                  alt={profile.avatar.alt || "Avatar"}
                  className="profile-avatar w-24 h-24 rounded-full border-4 border-white shadow-custom-dark"
                />
                <h2 className=" text-lightBeige text-shadow mt-2 text-lg">
                  {profile.name}
                </h2>
                <p className="text-lightBeige text-shadow">{profile.email}</p>
              </div>
            )}
          </div>
          <div className="profile-details mt-3">
            <section className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
              <h3 className="text-xl font-bold">Venues</h3>
              {profile.venueManager ? (
                profile.venues.length > 0 ? (
                  profile.venues.map((venue) => (
                    <div key={venue.id} className="venue-card mt-4">
                      <h4 className="text-lg font-semibold">{venue.name}</h4>
                      <p className="text-gray-600">{venue.description}</p>
                      {venue.media.length > 0 && (
                        <img
                          src={venue.media[0].url}
                          alt={venue.media[0].alt || "Venue image"}
                          className="venue-image w-full h-32 object-cover mt-2"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>No venues available.</p>
                )
              ) : (
                <div>
                  <p>You are not registered as a host.</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block hover:bg-darkGreen"
                  >
                    Register as a Host
                  </button>
                </div>
              )}
            </section>
            <section className="mt-3 py-5 sm:px-6">
              <h2 className="text-xl font-black">Bookings</h2>
              <p className="text-black">
                Here you can see all your bookings. You can also cancel them if
                needed.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 ">
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
                              className="venue-image w-full h-32 object-cover rounded-t-sm"
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
                  <p>No bookings available.</p>
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
            </section>
            <hr />
            <section className="mt-3 py-5 sm:px-6">
              <h3 className="text-xl font-black">Favorites</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 ">
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
                  <div>
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

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pb-40"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.87)" }}
        >
          <div className="bg-beige p-6 rounded-sm shadow-lg">
            <h2 className="text-xl font-black mb-2">Register as a Host</h2>
            <p>To register as a host, please click the link below:</p>
            <Link
              to="/register-host"
              className="bg-lightGreen shadow-custom-dark text-black font-bold px-4 py-2 rounded mt-4 inline-block"
            >
              Register as a Host
            </Link>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 ml-4 text-black cursor-pointer underline hover:text-blue-700"
            >
              I am not ready yet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
