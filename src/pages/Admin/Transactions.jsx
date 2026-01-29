import React, { useEffect, useState } from "react";
import { bookingsAPI } from "services/api";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import formatNumber from "utils/formatNumber";
import BookingDetailModal from "parts/Admin/BookingDetailModal";
import StatusBadge from "components/Admin/StatusBadge";
import FilterBar from "components/Admin/FilterBar";
import Pagination from "components/Admin/Pagination";
import { STATUS_FILTER_OPTIONS, PAGINATION } from "constants/admin";
import "assets/scss/admin.scss";

export default function Transactions() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });

  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = PAGINATION.DEFAULT_PAGE_SIZE;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Request all bookings for admin view (limit=100)
      const bookingsRes = await bookingsAPI.getAll({ limit: 100 });
      const bookingsList = bookingsRes.bookings || bookingsRes.data || [];
      setBookings(bookingsList);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    try {
      await bookingsAPI.confirm(id);
      toast.success("Booking approved successfully!");
      fetchBookings();
      if (selectedBooking && selectedBooking._id === id) {
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to approve booking");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this booking?"))
      return;
    try {
      await bookingsAPI.cancel(id, "Rejected by admin");
      toast.success("Booking rejected successfully!");
      fetchBookings();
      if (selectedBooking && selectedBooking._id === id) {
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to reject booking");
    }
  };

  const handleCheckIn = async (id) => {
    try {
      await bookingsAPI.checkIn(id);
      toast.success("Guest checked in successfully!");
      fetchBookings();
      if (selectedBooking && selectedBooking._id === id) {
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to check in guest");
    }
  };

  const handleCheckOut = async (id) => {
    try {
      await bookingsAPI.checkOut(id);
      toast.success("Guest checked out successfully!");
      fetchBookings();
      if (selectedBooking && selectedBooking._id === id) {
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to check out guest");
    }
  };

  const handleResetData = async () => {
    if (
      !window.confirm(
        "This will delete all bookings except the last 50. Are you sure?",
      )
    )
      return;
    try {
      await bookingsAPI.reset();
      toast.success("Data reset successfully!");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to reset data");
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleModalAction = (action, id) => {
    if (action === "approve") handleApprove(id);
    if (action === "reject") handleReject(id);
    if (action === "checkin") handleCheckIn(id);
    if (action === "checkout") handleCheckOut(id);
  };

  // Filtering Logic
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    const userName = booking.guestDetails?.firstName
      ? `${booking.guestDetails.firstName} ${booking.guestDetails.lastName}`
      : booking.user?.firstName
        ? `${booking.user.firstName} ${booking.user.lastName}`
        : "";

    const propertyName = booking.property?.name || "";
    const bookingId = booking.bookingId || booking._id || "";

    const matchesSearch =
      userName.toLowerCase().includes(searchLower) ||
      propertyName.toLowerCase().includes(searchLower) ||
      bookingId.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    let matchesDate = true;
    if (dateFilter.start) {
      matchesDate =
        matchesDate &&
        new Date(booking.createdAt) >= new Date(dateFilter.start);
    }
    if (dateFilter.end) {
      const endDate = new Date(dateFilter.end);
      endDate.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && new Date(booking.createdAt) <= endDate;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h2 mb-1 text-gray-900 fw-bold">Transactions</h1>
            <p className="text-muted mb-0">
              Manage all booking transactions and status updates.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary shadow-sm"
              onClick={handleResetData}
            >
              <i className="fas fa-trash-alt me-2"></i>Cleanup Data
            </button>
            <button
              className="btn btn-primary shadow-sm"
              onClick={fetchBookings}
            >
              <i className="fas fa-sync-alt me-2"></i>Refresh Data
            </button>
          </div>
        </div>

        {/* Filters & Table */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              searchPlaceholder="Search user, property, ID..."
              filterValue={statusFilter}
              onFilterChange={handleFilterChange}
              filterOptions={STATUS_FILTER_OPTIONS}
              showDateFilter={true}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              resultCount={paginatedBookings.length}
              totalCount={filteredBookings.length}
            />
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 admin-table">
                <thead>
                  <tr>
                    <th className="ps-4">Booking ID</th>
                    <th>User</th>
                    <th>Property</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        No bookings found matching filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="ps-4 fw-bold text-secondary">
                          #
                          {booking.bookingId ||
                            booking._id.substr(-6).toUpperCase()}
                        </td>
                        <td>
                          <div className="fw-semibold">
                            {booking.guestDetails?.firstName
                              ? `${booking.guestDetails.firstName} ${booking.guestDetails.lastName}`
                              : booking.user?.firstName
                                ? `${booking.user.firstName} ${booking.user.lastName}`
                                : "Unknown User"}
                          </div>
                          <div className="text-muted small">
                            {booking.guestDetails?.email ||
                              booking.user?.email ||
                              "-"}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                booking.property?.imageUrls?.[0]?.url
                                  ? `${process.env.REACT_APP_API_URL.replace("/api", "")}/${booking.property.imageUrls[0].url}`
                                  : "https://placehold.co/40x40"
                              }
                              alt={booking.property?.name || "Property"}
                              className="rounded me-2 border"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.src = "https://placehold.co/40x40";
                              }}
                            />
                            <div className="fw-semibold">
                              {booking.property?.name || "Unknown Property"}
                            </div>
                          </div>
                        </td>
                        <td className="fw-bold text-gray-800">
                          IDR{" "}
                          {formatNumber(
                            booking.pricing?.totalPrice ||
                              booking.totalPrice ||
                              0,
                          )}
                        </td>
                        <td>
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-info btn-circle text-white shadow-sm"
                              title="View Detail"
                              onClick={() => openModal(booking)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>

                            {(booking.status === "pending" ||
                              booking.status === "waiting_payment") && (
                              <>
                                <button
                                  className="btn btn-success btn-circle shadow-sm"
                                  title="Approve"
                                  onClick={() => handleApprove(booking._id)}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  className="btn btn-danger btn-circle shadow-sm"
                                  title="Reject"
                                  onClick={() => handleReject(booking._id)}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </>
                            )}

                            {(booking.status === "confirmed" ||
                              booking.status === "paid") && (
                              <button
                                className="btn btn-primary btn-circle shadow-sm"
                                title="Check In"
                                onClick={() => handleCheckIn(booking._id)}
                              >
                                <i className="fas fa-sign-in-alt"></i>
                              </button>
                            )}

                            {booking.status === "checked_in" && (
                              <button
                                className="btn btn-secondary btn-circle shadow-sm"
                                title="Check Out"
                                onClick={() => handleCheckOut(booking._id)}
                              >
                                <i className="fas fa-sign-out-alt"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer bg-white border-0 py-3">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </Fade>

      <BookingDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        booking={selectedBooking}
        onAction={handleModalAction}
      />
    </div>
  );
}
