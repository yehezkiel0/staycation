import React from "react";
import PropTypes from "prop-types";

/**
 * FilterBar Component
 * Reusable filter bar with search, dropdown filter, and optional date range
 */
export default function FilterBar({
  searchTerm = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  filterValue = "all",
  onFilterChange,
  filterOptions = [],
  showDateFilter = false,
  dateFilter = { start: "", end: "" },
  onDateFilterChange,
  resultCount = 0,
  totalCount = 0,
}) {
  return (
    <div className="row g-2 align-items-center">
      {/* Search Input */}
      <div className={showDateFilter ? "col-md-4" : "col-md-6"}>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">
            <i className="fas fa-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Dropdown */}
      {filterOptions.length > 0 && (
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Date Filter */}
      {showDateFilter && (
        <div className="col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-light">Date</span>
            <input
              type="date"
              className="form-control"
              value={dateFilter?.start || ""}
              onChange={(e) =>
                onDateFilterChange({ ...dateFilter, start: e.target.value })
              }
            />
            <span className="input-group-text">-</span>
            <input
              type="date"
              className="form-control"
              value={dateFilter?.end || ""}
              onChange={(e) =>
                onDateFilterChange({ ...dateFilter, end: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {/* Result Count */}
      {!showDateFilter && (
        <div className="col-md-3 text-end">
          <span className="text-muted small">
            Showing {resultCount} of {totalCount}
          </span>
        </div>
      )}
    </div>
  );
}

FilterBar.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  showDateFilter: PropTypes.bool,
  dateFilter: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  onDateFilterChange: PropTypes.func,
  resultCount: PropTypes.number,
  totalCount: PropTypes.number,
};
