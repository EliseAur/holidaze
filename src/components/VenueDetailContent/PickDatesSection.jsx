import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * PickDatesSection component displays a date picker for selecting a booking range.
 * It highlights available, unavailable, and selected dates, and prevents booking dates in the past.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Date} props.startDate - The selected start date for the booking.
 * @param {Date} [props.endDate] - The selected end date for the booking.
 * @param {Function} props.handleDateChange - Function to handle changes in the selected date range.
 * @param {Array<Date>} props.bookedDates - An array of dates that are already booked and should be disabled.
 * @param {Function} props.getDayClassName - Function to apply custom CSS classes to specific dates.
 * @returns {JSX.Element} The rendered PickDatesSection component.
 */
export default function PickDatesSection({
  startDate,
  endDate,
  handleDateChange,
  bookedDates,
  getDayClassName,
}) {
  return (
    <div className="h-full min-w-[258.3px]">
      <h2 className="text-md sm:text-lg font-black">Book</h2>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        locale="en-GB"
        minDate={new Date()} // Prevent booking dates in the past
        excludeDates={bookedDates} // Disable booked dates
        dayClassName={getDayClassName} // Apply custom CSS class to booked dates
      />
      <div className="flex text-xs ml-1">
        <div className="flex items-center mr-2">
          <span className="w-4 h-4 bg-white inline-block rounded-sm border-datepicker mr-1"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center mr-2">
          <span className="w-4 h-4 bg-darkBeige inline-block rounded-sm border-datepicker mr-1"></span>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-300 inline-block rounded-sm border-datepicker mr-1"></span>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}

PickDatesSection.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired,
  bookedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  getDayClassName: PropTypes.func.isRequired,
};
