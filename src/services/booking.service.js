// Booking Service - Business logic for bookings
import { bookingsAPI } from "./api";

class BookingService {
  /**
   * Get all user bookings
   * @returns {Promise<Object>} Bookings data
   */
  async getUserBookings() {
    try {
      const response = await bookingsAPI.getAll();
      return {
        success: true,
        bookings: response.bookings || [],
        message: "Bookings retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to fetch bookings",
        bookings: [],
      };
    }
  }

  /**
   * Get booking by ID
   * @param {string} bookingId - Booking ID
   * @returns {Promise<Object>} Booking data
   */
  async getBookingById(bookingId) {
    try {
      const response = await bookingsAPI.getById(bookingId);
      return {
        success: true,
        booking: response.booking,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to fetch booking",
      };
    }
  }

  /**
   * Create new booking
   * @param {Object} bookingData - Booking information
   * @returns {Promise<Object>} Created booking
   */
  async createBooking(bookingData) {
    try {
      // Validate booking data
      const validationError = this.validateBookingData(bookingData);
      if (validationError) {
        return {
          success: false,
          error: validationError,
        };
      }

      const response = await bookingsAPI.create(bookingData);
      return {
        success: true,
        booking: response.booking,
        message: "Booking created successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to create booking",
      };
    }
  }

  /**
   * Cancel booking
   * @param {string} bookingId - Booking ID to cancel
   * @returns {Promise<Object>} Cancellation result
   */
  async cancelBooking(bookingId) {
    try {
      const response = await bookingsAPI.update(bookingId, {
        status: "cancelled",
      });
      return {
        success: true,
        booking: response.booking,
        message: "Booking cancelled successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to cancel booking",
      };
    }
  }

  /**
   * Validate booking data
   * @param {Object} data - Booking data
   * @returns {string|null} Error message or null if valid
   */
  validateBookingData(data) {
    if (!data.property) {
      return "Property is required";
    }
    if (!data.startDate) {
      return "Check-in date is required";
    }
    if (!data.endDate) {
      return "Check-out date is required";
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      return "Check-in date cannot be in the past";
    }
    if (endDate <= startDate) {
      return "Check-out date must be after check-in date";
    }
    if (!data.duration || data.duration < 1) {
      return "Booking duration must be at least 1 night";
    }

    return null;
  }

  /**
   * Calculate booking total
   * @param {number} pricePerNight - Price per night
   * @param {number} duration - Number of nights
   * @returns {number} Total price
   */
  calculateTotal(pricePerNight, duration) {
    return pricePerNight * duration;
  }

  /**
   * Filter bookings by status
   * @param {Array} bookings - Array of bookings
   * @param {string} status - Status to filter by
   * @returns {Array} Filtered bookings
   */
  filterByStatus(bookings, status) {
    if (!status || status === "all") {
      return bookings;
    }
    return bookings.filter((booking) => booking.status === status);
  }

  /**
   * Get upcoming bookings
   * @param {Array} bookings - Array of bookings
   * @returns {Array} Upcoming bookings
   */
  getUpcomingBookings(bookings) {
    const today = new Date();
    return bookings.filter((booking) => {
      const startDate = new Date(booking.startDate);
      return startDate >= today && booking.status !== "cancelled";
    });
  }

  /**
   * Get past bookings
   * @param {Array} bookings - Array of bookings
   * @returns {Array} Past bookings
   */
  getPastBookings(bookings) {
    const today = new Date();
    return bookings.filter((booking) => {
      const startDate = new Date(booking.startDate);
      return (
        startDate < today ||
        booking.status === "completed" ||
        booking.status === "cancelled"
      );
    });
  }

  /**
   * Format booking date range
   * @param {string} startDate - Start date
   * @param {string} endDate - End date
   * @returns {string} Formatted date range
   */
  formatDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options = { month: "short", day: "numeric", year: "numeric" };
    const startStr = start.toLocaleDateString("en-US", options);
    const endStr = end.toLocaleDateString("en-US", options);

    return `${startStr} - ${endStr}`;
  }

  /**
   * Calculate duration in nights
   * @param {string} startDate - Start date
   * @param {string} endDate - End date
   * @returns {number} Number of nights
   */
  calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

export default new BookingService();
