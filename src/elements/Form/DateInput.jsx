import React from "react";
import propTypes from "prop-types";

// Custom Input for DatePicker
const DateInput = React.forwardRef(({ value, onClick }, ref) => (
  <div
    className="input-group date-input-group"
    onClick={onClick}
    ref={ref}
    style={{ cursor: "pointer" }}
  >
    <span className="input-group-text bg-light border-end-0">
      <i className="fas fa-calendar-alt text-primary"></i>
    </span>
    <div className="form-control border-start-0 ps-0 bg-white">
      {value || "Select dates"}
    </div>
  </div>
));

DateInput.propTypes = {
  value: propTypes.string,
  onClick: propTypes.func,
};

DateInput.displayName = "DateInput";

export default DateInput;
