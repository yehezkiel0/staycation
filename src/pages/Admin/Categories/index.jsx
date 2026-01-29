import React, { useState, useEffect } from "react";
import axios from "configs/axios";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";
import FilterBar from "components/Admin/FilterBar";
import Pagination from "components/Admin/Pagination";
import { PAGINATION } from "constants/admin";
import "assets/scss/admin.scss";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = PAGINATION.DEFAULT_PAGE_SIZE;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/categories");
      setCategories(res.data.categories || res.data);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/categories/${id}`);
        toast.success("Category deleted successfully!");
        fetchCategories();
      } catch (err) {
        toast.error("Failed to delete category");
        console.error(err);
      }
    }
  };

  // Filtering Logic
  const filteredCategories = categories.filter((cat) => {
    const searchLower = searchTerm.toLowerCase();
    const name = (cat.name || "").toLowerCase();
    const slug = (cat.slug || "").toLowerCase();
    return name.includes(searchLower) || slug.includes(searchLower);
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
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

  return (
    <div className="container-fluid">
      <Fade triggerOnce>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h2 mb-1 text-gray-900 fw-bold">Categories</h1>
            <p className="text-muted mb-0">Manage property categories</p>
          </div>
          <Link
            to="/admin/categories/add"
            className="btn btn-primary shadow-sm"
          >
            <i className="fas fa-plus me-2"></i>Add Category
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Card with Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 py-3">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              searchPlaceholder="Search by name or slug..."
              resultCount={paginatedCategories.length}
              totalCount={filteredCategories.length}
            />
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 admin-table">
                <thead>
                  <tr>
                    <th className="ps-4" style={{ width: "80px" }}>
                      Icon
                    </th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th className="text-center">Actions</th>
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
                  ) : paginatedCategories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted">
                        No categories found.
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((category) => (
                      <tr key={category._id}>
                        <td
                          className="ps-4 text-center"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {category.icon && category.icon.includes("fa-") ? (
                            <i
                              className={category.icon}
                              style={{ color: "#3252DF" }}
                            ></i>
                          ) : (
                            category.icon || "📂"
                          )}
                        </td>
                        <td className="fw-semibold">{category.name}</td>
                        <td>
                          <code className="bg-light px-2 py-1 rounded">
                            {category.slug}
                          </code>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/admin/categories/edit/${category._id}`}
                              className="btn btn-warning btn-sm"
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(category._id)}
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
