import { useState, useEffect, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { fetchVenueDetails } from "../api";
import { VenueDetailContent, LoadingSpinner } from "../components";
import { fetchBooking } from "../api";
import { differenceInDays } from "date-fns";
import { Modal, BookingConfirmation, VenueUpdateForm } from "../components";

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openVenueModal = () => setIsVenueModalOpen(true);
  const closeVenueModal = () => setIsVenueModalOpen(false);

  // Use useCallback to memoize the loadVenue function
  const loadVenue = useCallback(async () => {
    if (isRedirecting) return; // Skip fetching if redirecting
    try {
      const venue = await fetchVenueDetails(id);
      console.log("Venue details with API fetch:", venue);
      setVenue(venue);
    } catch (error) {
      setError({
        message: error.message,
        status: error.status,
        statusCode: error.statusCode,
      });
    }
  }, [id, isRedirecting]); // Add 'id' as a dependency since it can change

  useEffect(() => {
    loadVenue(); // Call loadVenue when the component mounts or id changes
  }, [loadVenue]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const nights = differenceInDays(end, start);
      setTotalPrice(nights * venue.price);
    }
  };

  const handleBooking = async () => {
    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: Number(guests),
      venueId: venue.id,
    };

    try {
      const result = await fetchBooking(bookingData);
      console.log("Booking successful:", result);
      openBookingModal(); // Open the modal
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  if (error) {
    console.log("Error fetching venue:", error);
    return null;
  }

  if (isRedirecting) {
    return <Navigate to="/account" />; // Redirect to the account page
  }

  if (!venue) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {venue && (
        <VenueDetailContent
          venue={venue}
          startDate={startDate}
          endDate={endDate}
          guests={guests}
          totalPrice={totalPrice}
          handleDateChange={handleDateChange}
          handleBooking={handleBooking}
          setGuests={setGuests}
          isBookingModalOpen={isBookingModalOpen}
          closeBookingModal={closeBookingModal}
          openVenueModal={openVenueModal}
          isVenueModalOpen={isVenueModalOpen}
          closeVenueModal={closeVenueModal}
          setIsRedirecting={setIsRedirecting}
        />
      )}
      <Modal isOpen={isBookingModalOpen} onClose={closeBookingModal}>
        <BookingConfirmation onClose={closeBookingModal} />
      </Modal>
      <Modal isOpen={isVenueModalOpen} onClose={closeVenueModal}>
        <VenueUpdateForm
          venue={venue}
          onClose={closeVenueModal}
          onUpdate={() => {
            console.log("Re-fetching venue details after update...");
            loadVenue(); // Re-fetch the updated venue details
          }}
        />
      </Modal>
    </>
  );
}

export default VenueDetail;
