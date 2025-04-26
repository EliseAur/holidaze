import { useState, useEffect, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { fetchVenueDetails } from "../api";
import {
  LoadingSpinner,
  Modal,
  BookingConfirmation,
  VenueUpdateForm,
  ModalMessage,
} from "../components";
import { resetBookingForm, calculateTotalPrice } from "../utils";
import { VenueDetailContent } from "../components/VenueDetailContent";
import { ErrorBox } from "../components/common";
import useSEO from "../hooks/useSEO";
import { fetchBooking } from "../api";
import { eachDayOfInterval, isSameDay } from "date-fns";

/**
 * VenueDetail component for displaying detailed information about a specific venue.
 * Handles booking functionality, date selection, and venue updates.
 * Includes modals for booking confirmation, error messages, and venue updates.
 *
 * @component
 * @returns {JSX.Element} The rendered VenueDetail component.
 *
 * @example
 * <VenueDetail />
 */
function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Dynamically update SEO metadata
  useSEO({
    title: venue ? `Holidaze | ${venue.name}` : "Holidaze | Venue Details",
    description: venue
      ? `Discover "${venue.name}" on Holidaze. ${venue.description} Book your stay today.`
      : "Explore venue details on Holidaze. Book your next getaway today.",
    keywords: venue
      ? `"${venue.name}", vacation homes, holiday rentals, Holidaze`
      : "venue details, vacation homes, holiday rentals, Holidaze",
  });

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openMessageModal = (message) => {
    setModalMessage(message);
    setIsMessageModalOpen(true);
  };
  const closeMessageModal = () => {
    setModalMessage("");
    setIsMessageModalOpen(false);
  };

  const openVenueModal = () => setIsVenueModalOpen(true);
  const closeVenueModal = () => setIsVenueModalOpen(false);

  // Use useCallback to memoize the loadVenue function
  const loadVenue = useCallback(async () => {
    if (isRedirecting) return; // Skip fetching if redirecting
    try {
      setError(null); // Reset error state
      const venue = await fetchVenueDetails(id);
      setVenue(venue);
    } catch (error) {
      setError(
        `Failed to load venue. Please try again later. ${error.message}`,
      );
    }
  }, [id, isRedirecting]); // Add 'id' as a dependency since it can change

  useEffect(() => {
    loadVenue(); // Call loadVenue when the component mounts or id changes
  }, [loadVenue]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setTotalPrice(calculateTotalPrice(start, end, venue.price));
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      openMessageModal("Please select valid start and end dates.");
      resetForm(); // Reset the form
      return;
    }
    // Validate the selected dates
    const isOverlapping = venue.bookings.some((booking) =>
      eachDayOfInterval({ start: startDate, end: endDate }).some(
        (selectedDate) =>
          isSameDay(new Date(booking.dateFrom), selectedDate) ||
          isSameDay(new Date(booking.dateTo), selectedDate),
      ),
    );

    if (isOverlapping) {
      openMessageModal(
        "The selected dates overlap with an existing booking. Please choose different dates.",
      );
      resetBookingForm(); // Reset the form
      return;
    }

    try {
      const bookingData = {
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests: Number(guests),
        venueId: venue.id,
      };
      const result = await fetchBooking(bookingData);
      console.log("Booking successful:", result);

      // Re-fetch the venue details to update bookings
      await loadVenue();
      openBookingModal(); // Open the modal
      resetForm(); // Reset the form
    } catch (error) {
      console.error("Error booking:", error);
      openMessageModal(
        `An error occurred while booking. Please try again later. ${error.message}`,
      );
      resetForm(); // Reset the form
    }
  };

  const resetForm = () =>
    resetBookingForm(setStartDate, setEndDate, setGuests, setTotalPrice);

  if (error) {
    return <ErrorBox message={error} />;
  }

  if (isRedirecting) {
    return <Navigate to="/account" />;
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

      <ModalMessage
        isOpen={isMessageModalOpen}
        message={modalMessage}
        onClose={closeMessageModal}
      />

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
