import { useState, useEffect } from "react";
import { VenueCard } from "../components";
import { fetchProfile } from "../api/fetchProfile";
import { fetchFavorites } from "../api";
import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";

export default function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { favorites, handleFavoriteClick } = useFavorites(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);

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

  return (
    <div className="profile-page max-w-[1200px] mx-auto p-4">
      {/* <h1 className="text-3xl font-black italic">Profile</h1> */}
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
              // <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
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
            <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
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
            </div>
            <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
              <h3 className="text-xl font-black">Bookings</h3>
              {profile.bookings.length > 0 ? (
                profile.bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <h4>{booking.venue.name}</h4>
                    <p>
                      From: {booking.dateFrom} To: {booking.dateTo}
                    </p>
                    <p>Guests: {booking.guests}</p>
                  </div>
                ))
              ) : (
                <p>No bookings available.</p>
              )}
            </div>
            <div className="mt-3 bg-lightBeige rounded-sm shadow-sm p-5">
              <h3 className="text-xl font-black">Favorites</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
                {favoriteVenues.length > 0 ? (
                  favoriteVenues.map((venue) => (
                    <div key={venue.id} className="mt-3">
                      <VenueCard
                        // key={venue.id}
                        venue={venue}
                        isFavorite={true}
                        onFavoriteClick={handleFavoriteClick}
                        additionalClass="m-3"
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
            </div>
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
