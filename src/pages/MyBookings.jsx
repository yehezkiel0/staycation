import React, { useState, useEffect } from "react";
import { bookingsAPI } from "services/api";
import { toast } from "react-toastify";
import Header from "parts/Header";
import Footer from "parts/Footer";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import formatDate from "utils/formatDate";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, upcoming, past

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingsAPI.getAll();
      setBookings(response.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "warning",
      confirmed: "info",
      completed: "success",
      cancelled: "danger",
    };
    return statusMap[status] || "secondary";
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;

    const bookingDate = new Date(booking.startDate);
    const today = new Date();

    if (filter === "upcoming") {
      return bookingDate >= today && booking.status !== "cancelled";
    }

    if (filter === "past") {
      return (
        bookingDate < today ||
        booking.status === "completed" ||
        booking.status === "cancelled"
      );
    }

    return true;
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className="container my-5" style={{ minHeight: "70vh" }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your bookings...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section
        className="my-bookings-section py-5"
        style={{ minHeight: "70vh" }}
      >
        <div className="container">
          <Fade triggerOnce>
            {/* Page Header */}
            <div className="mb-4">
              <h1 className="h2 fw-bold mb-2">
                <i className="fas fa-calendar-check text-primary me-2"></i>
                My Bookings
              </h1>
              <p className="text-muted">
                Manage and track your property reservations
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-4">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setFilter("all")}
                >
                  All Bookings ({bookings.length})
                </button>
                <button
                  type="button"
                  className={`btn ${filter === "upcoming" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setFilter("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  type="button"
                  className={`btn ${filter === "past" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setFilter("past")}
                >
                  Past
                </button>
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="card border-0 shadow-sm text-center py-5">
                <div className="card-body">
                  <i className="fas fa-calendar-times fa-4x text-muted mb-3"></i>
                  <h4 className="mb-3">No Bookings Found</h4>
                  <p className="text-muted mb-4">
                    {filter === "all"
                      ? "You haven't made any bookings yet."
                      : `No ${filter} bookings found.`}
                  </p>
                  <Link to="/browse-by" className="btn btn-primary">
                    <i className="fas fa-search me-2"></i>
                    Browse Properties
                  </Link>
                </div>
              </div>
            ) : (
              <div className="row">
                {filteredBookings.map((booking) => (
                  <div key={booking._id} className="col-12 mb-4">
                    <div className="card border-0 shadow-sm h-100 booking-card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          {/* Property Image */}
                          <div className="col-md-3">
                            <img
                              src={
                                booking.property?.images?.[0] ||
                                "https://via.placeholder.com/300x200"
                              }
                              alt={booking.property?.name}
                              className="img-fluid rounded"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* Booking Details */}
                          <div className="col-md-6">
                            <h5 className="mb-2 fw-bold">
                              {booking.property?.name || "Property Name"}
                            </h5>
                            <p className="text-muted mb-2">
                              <i className="fas fa-map-marker-alt me-2"></i>
                              {booking.property?.location || "Location"}
                            </p>
                            <div className="mb-2">
                              <span
                                className={`badge bg-${getStatusBadge(booking.status)} me-2`}
                              >
                                {booking.status?.toUpperCase()}
                              </span>
                            </div>
                            <div className="booking-info">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-calendar text-primary me-2"></i>
                                <span>
                                  <strong>Check-in:</strong>{" "}
                                  {formatDate(booking.startDate)}
                                </span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-calendar text-primary me-2"></i>
                                <span>
                                  <strong>Check-out:</strong>{" "}
                                  {formatDate(booking.endDate)}
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <i className="fas fa-moon text-primary me-2"></i>
                                <span>
                                  <strong>Duration:</strong>{" "}
                                  {booking.duration || 1} night(s)
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Booking Total & Actions */}
                          <div className="col-md-3 text-md-end">
                            <div className="mb-3">
                              <h4 className="text-primary fw-bold mb-0">
                                ${booking.total?.toLocaleString()}
                              </h4>
                              <small className="text-muted">
                                Total Payment
                              </small>
                            </div>
                            <div className="d-grid gap-2">
                              <Link
                                to={`/properties/${booking.property?._id}`}
                                className="btn btn-outline-primary btn-sm"
                              >
                                <i className="fas fa-eye me-2"></i>
                                View Property
                              </Link>
                              {booking.status === "pending" && (
                                <button className="btn btn-outline-danger btn-sm">
                                  <i className="fas fa-times me-2"></i>
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                            <small className="text-muted d-block mt-2">
                              Booking ID: #{booking._id?.slice(-8)}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Fade>
        </div>
      </section>
      <Footer />

      <style>{`
        .booking-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .booking-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
        
        .booking-info {
          font-size: 0.95rem;
        }
      `}</style>
    </>
  );
}
