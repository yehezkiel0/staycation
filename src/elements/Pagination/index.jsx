import React from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    // Show middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Page navigation"
      className={`pagination-wrapper ${className}`}
    >
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {pages.map((page, index) => (
          <li
            key={index}
            className={`page-item ${
              page === currentPage ? "active" : ""
            } ${page === "..." ? "disabled" : ""}`}
          >
            {page === "..." ? (
              <span className="page-link">...</span>
            ) : (
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>

      <div className="pagination-info text-center mt-2">
        <small className="text-muted">
          Page {currentPage} of {totalPages}
        </small>
      </div>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  maxVisible: propTypes.number,
  className: propTypes.string,
};
