import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueDetails } from "../api";
import { VenueDetailContent, LoadingSpinner } from "../components";
import { fetchBooking } from "../api";
import { differenceInDays } from "date-fns";
import { Modal, BookingConfirmation } from "../components";

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    async function loadVenue() {
      try {
        const venue = await fetchVenueDetails(id);
        console.log("Venue details with api fetch:", venue);
        setVenue(venue);
      } catch (error) {
        setError({
          message: error.message,
          status: error.status,
          statusCode: error.statusCode,
        });
      }
    }

    loadVenue();
  }, [id]);

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
        />
      )}
      <Modal isOpen={isBookingModalOpen} onClose={closeBookingModal}>
        <BookingConfirmation onClose={closeBookingModal} />
      </Modal>
    </>
  );
}

export default VenueDetail;
