import React from "react";
import PropTypes from "prop-types";
import { BOOKING_STATUS } from "constants/admin";

/**
 * StatusBadge Component
 * Displays booking status as a colored badge with icon
 */
export default function StatusBadge({ status = "pending" }) {
  const config = BOOKING_STATUS[status] || {
    color: "secondary",
    icon: "fa-question",
    label: status || "Unknown",
  };

  return (
    <span className={`badge bg-${config.color} text-white status-badge`}>
      <i className={`fas ${config.icon}`}></i>
      {config.label}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
};
