import { differenceInDays } from "date-fns";

/**
 * Resets the booking form fields to their default values.
 *
 * @param {Function} setStartDate - Function to set the start date.
 * @param {Function} setEndDate - Function to set the end date.
 * @param {Function} setGuests - Function to set the number of guests.
 * @param {Function} setTotalPrice - Function to set the total price.
 *
 * @example
 * resetBookingForm(setStartDate, setEndDate, setGuests, setTotalPrice);
 */
export const resetBookingForm = (
  setStartDate,
  setEndDate,
  setGuests,
  setTotalPrice,
) => {
  setStartDate(null);
  setEndDate(null);
  setGuests(1);
  setTotalPrice(0);
};

/**
 * Calculates the total price for a booking based on the number of nights and the price per night.
 *
 * @param {Date} startDate - The start date of the booking.
 * @param {Date} endDate - The end date of the booking.
 * @param {number} price - The price per night.
 * @returns {number} The total price for the booking. Returns 0 if startDate or endDate is not provided.
 *
 * @example
 * const totalPrice = calculateTotalPrice(new Date("2025-04-01"), new Date("2025-04-05"), 100);
 * console.log(totalPrice); // Outputs: 400
 */
export const calculateTotalPrice = (startDate, endDate, price) => {
  if (startDate && endDate) {
    const nights = differenceInDays(endDate, startDate);
    return nights * price;
  }
  return 0;
};
