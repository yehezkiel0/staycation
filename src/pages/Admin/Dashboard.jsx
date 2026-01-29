import React, { useEffect, useState } from "react";
import { categoriesAPI, propertiesAPI, bookingsAPI } from "services/api";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import formatNumber from "utils/formatNumber";
import StatusBadge from "components/Admin/StatusBadge";
import "assets/scss/admin.scss";

export default function Dashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    bookings: 0,
    categories: 0,
    transactions: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [propertiesRes, categoriesRes, bookingsRes] = await Promise.all([
        propertiesAPI.getAll(),
        categoriesAPI.getAll(),
        bookingsAPI.getAll(),
      ]);

      const bookingsList = bookingsRes.bookings || bookingsRes.data || [];
      const propertiesList =
        propertiesRes.properties || propertiesRes.data || [];
      const categoriesList =
        categoriesRes.categories || categoriesRes.data || [];

      setBookings(bookingsList);

      setStats({
        properties: propertiesList.length,
        categories: categoriesList.length,
        bookings: bookingsList.length,
        transactions: bookingsList.reduce(
          (acc, curr) =>
            acc + (curr.totalPrice || curr.pricing?.totalPrice || 0),
          0,
        ),
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h2 mb-1 text-gray-900 fw-bold">Dashboard</h1>
            <p className="text-muted mb-0">
              Overview of your property management system.
            </p>
          </div>
          <button className="btn btn-primary shadow-sm" onClick={fetchData}>
            <i className="fas fa-sync-alt me-2"></i>Refresh
          </button>
        </div>

        {/* Stats Row */}
        <div className="row mb-4">
          <StatCard
            title="Total Properties"
            value={stats.properties}
            icon="fa-building"
            color="primary"
            link="/admin/properties"
            loading={loading}
          />
          <StatCard
            title="Total Categories"
            value={stats.categories}
            icon="fa-list"
            color="success"
            link="/admin/categories"
            loading={loading}
          />
          <StatCard
            title="Total Bookings"
            value={stats.bookings}
            icon="fa-calendar-check"
            color="info"
            link="/admin/transactions"
            loading={loading}
          />
          <StatCard
            title="Total Revenue"
            value={`IDR ${formatNumber(stats.transactions)}`}
            icon="fa-dollar-sign"
            color="warning"
            link="/admin/transactions"
            loading={loading}
          />
        </div>

        {/* Latest Activity */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold text-gray-800">Latest Activity</h5>
            <a
              href="/admin/transactions"
              className="btn btn-sm btn-outline-primary"
            >
              View All Transactions
            </a>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 admin-table">
                <thead>
                  <tr>
                    <th className="ps-4">Booking ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th className="text-end pe-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5">
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
                      <td colSpan="4" className="text-center py-5 text-muted">
                        No recent activity.
                      </td>
                    </tr>
                  ) : (
                    bookings.slice(0, 5).map((booking) => (
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
                        </td>
                        <td className="text-muted">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-end pe-4">
                          <StatusBadge status={booking.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

const StatCard = ({ title, value, icon, color, link, loading }) => (
  <div className="col-xl-3 col-md-6 mb-4">
    <div className="card border-0 shadow-sm h-100 card-hover">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div
              className={`text-uppercase text-${color} fw-bold mb-1`}
              style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
            >
              {title}
            </div>
            <div className="h3 mb-0 fw-bold text-gray-800">
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                value
              )}
            </div>
          </div>
          <div className={`icon-circle bg-${color}-light`}>
            <i className={`fas ${icon} fa-lg text-${color}`}></i>
          </div>
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 pt-0">
        <a
          href={link}
          className={`text-${color} small fw-semibold text-decoration-none`}
        >
          View details <i className="fas fa-arrow-right ms-1"></i>
        </a>
      </div>
    </div>
  </div>
);
