import React, { useState, useEffect } from "react";
import axios from "configs/axios";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";
import formatNumber from "utils/formatNumber";
import FilterBar from "components/Admin/FilterBar";
import Pagination from "components/Admin/Pagination";
import { TYPE_FILTER_OPTIONS, PAGINATION } from "constants/admin";
import "assets/scss/admin.scss";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = PAGINATION.DEFAULT_PAGE_SIZE;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // Request all properties for admin view (limit=100)
      const res = await axios.get("/properties?limit=100");
      setProperties(res.data.properties || res.data);
    } catch (err) {
      setError("Failed to fetch properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`/properties/${id}`);
        toast.success("Property deleted successfully!");
        fetchProperties();
      } catch (err) {
        toast.error("Failed to delete property");
        console.error(err);
      }
    }
  };

  // Filtering Logic - handle both flat and nested fields from backend
  const filteredProperties = properties.filter((prop) => {
    const searchLower = searchTerm.toLowerCase();
    const name = (prop.name || prop.title || "").toLowerCase();
    // Handle nested location fields from backend
    const city = (prop.location?.city || prop.city || "").toLowerCase();
    const country = (
      prop.location?.country ||
      prop.country ||
      ""
    ).toLowerCase();

    const matchesSearch =
      name.includes(searchLower) ||
      city.includes(searchLower) ||
      country.includes(searchLower);

    const matchesType = typeFilter === "all" || prop.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
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
    setTypeFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h2 mb-1 text-gray-900 fw-bold">Properties</h1>
            <p className="text-muted mb-0">Manage all property listings</p>
          </div>
          <Link
            to="/admin/properties/add"
            className="btn btn-primary shadow-sm"
          >
            <i className="fas fa-plus me-2"></i> Add Property
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Card with Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              searchPlaceholder="Search by name, city, country..."
              filterValue={typeFilter}
              onFilterChange={handleFilterChange}
              filterOptions={TYPE_FILTER_OPTIONS}
              resultCount={paginatedProperties.length}
              totalCount={filteredProperties.length}
            />
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 admin-table">
                <thead>
                  <tr>
                    <th className="ps-4" style={{ width: "120px" }}>
                      Image
                    </th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
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
                  ) : paginatedProperties.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        No properties found matching filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedProperties.map((prop) => (
                      <tr key={prop._id}>
                        <td className="ps-4">
                          <img
                            src={
                              // Handle both images (backend) and imageUrls (legacy)
                              prop.images?.[0]?.url || prop.imageUrls?.[0]?.url
                                ? `${process.env.REACT_APP_API_URL?.replace("/api", "") || ""}/${prop.images?.[0]?.url || prop.imageUrls?.[0]?.url}`
                                : "https://placehold.co/100x60?text=No+Image"
                            }
                            alt={prop.name || prop.title}
                            className="rounded border"
                            style={{
                              width: "100px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/100x60?text=No+Image";
                            }}
                          />
                        </td>
                        <td>
                          <div className="fw-semibold">
                            {prop.name || prop.title}
                          </div>
                          <div
                            className="text-muted small text-truncate"
                            style={{ maxWidth: "200px" }}
                          >
                            {prop.description?.substring(0, 50)}...
                          </div>
                        </td>
                        <td>
                          <i className="fas fa-map-marker-alt text-danger me-1"></i>
                          {prop.location?.city || prop.city},{" "}
                          {prop.location?.country || prop.country}
                        </td>
                        <td>
                          <span className="badge bg-info text-white">
                            {prop.type}
                          </span>
                        </td>
                        <td className="fw-bold">
                          Rp{" "}
                          {formatNumber(
                            typeof prop.price === "object"
                              ? prop.price.amount
                              : prop.price,
                          )}
                          <span className="text-muted fw-normal">
                            {" "}
                            / {prop.price?.per || prop.unit || "night"}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/admin/properties/edit/${prop._id}`}
                              className="btn btn-warning btn-sm"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(prop._id)}
                              className="btn btn-danger btn-sm"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
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
    </div>
  );
}
