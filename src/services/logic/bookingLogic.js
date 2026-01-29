export const getStatusBadge = (status) => {
  const statusMap = {
    pending: "warning",
    confirmed: "info",
    completed: "success",
    cancelled: "danger",
    checked_in: "primary", // Added checked_in as it was in backend but missing in frontend map potentially
  };
  return statusMap[status] || "secondary";
};

export const filterBookings = (bookings, filterType) => {
  return bookings.filter((booking) => {
    if (filterType === "all") return true;

    const bookingDate = new Date(booking.checkIn);
    const today = new Date();
    // Reset time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);

    if (filterType === "upcoming") {
      return bookingDate >= today && booking.status !== "cancelled";
    }

    if (filterType === "past") {
      return (
        bookingDate < today ||
        booking.status === "completed" ||
        booking.status === "cancelled"
      );
    }

    return true;
  });
};
