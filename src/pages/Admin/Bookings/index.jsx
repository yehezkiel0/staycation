import React, { useState, useEffect } from "react";
import { bookingsAPI } from "services/api";
import { Fade } from "react-awesome-reveal";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBookings(1);
  }, []);

  const fetchBookings = async (pageNo = 1) => {
    setLoading(true);
    try {
      const res = await bookingsAPI.getAll({ page: pageNo, limit: 10 });
      // Identify response structure (normalized in api.js or raw?)
      // api.js getAll returns res.data. Backend returns { bookings, totalPages, currentPage }
      // So res might be the full object if api.js returns response.data

      const data = res.bookings ? res : res.data; // Handle potential wrapper

      setBookings(data.bookings || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || 1);
    } catch (err) {
      setError("Failed to fetch bookings. Ensure you are logged in as admin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchBookings(newPage);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
      case "completed":
      case "paid":
        return "success";
      case "pending":
      case "checked_in":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Transactions / Bookings</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">All Bookings</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User</th>
                    <th>Property</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>#{booking.bookingId || booking._id.substr(-6)}</td>
                        <td>
                          {booking.member?.firstName} {booking.member?.lastName}
                          <br />
                          <small className="text-muted">
                            {booking.member?.email}
                          </small>
                        </td>
                        <td>
                          {booking.itemId?.title}
                          <br />
                          <small className="text-muted">
                            {booking.itemId?.city}, {booking.itemId?.country}
                          </small>
                        </td>
                        <td>$ {booking.total?.toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge bg-${getStatusBadge(
                              booking.payments?.status || booking.status
                            )}`}
                          >
                            {booking.payments?.status || booking.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-info"
                            title="View Detail"
                          >
                            <i className="fas fa-eye text-white"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {/* Show range of pages if too many */}
                    {[...Array(totalPages)].map((_, i) => {
                      // Simple logic: show first 5, last 2, or current surroundings
                      // For now, show max 10 to keep it simple or full list if < 20
                      if (
                        totalPages > 20 &&
                        Math.abs(page - (i + 1)) > 3 &&
                        i !== 0 &&
                        i !== totalPages - 1
                      ) {
                        if (Math.abs(page - (i + 1)) === 4)
                          return (
                            <li key={i} className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          );
                        return null;
                      }

                      return (
                        <li
                          key={i}
                          className={`page-item ${
                            page === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      );
                    })}

                    <li
                      className={`page-item ${
                        page === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
}
