import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export default function Star({ className, value, height, width, spacing }) {
  const rating = Math.min(Math.max(value, 0), 5); // Clamp between 0 and 5
  
  return (
    <div className={["stars", className].join(" ")} style={{ height: height }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={`star-${star}`}
          className={`star ${star <= rating ? 'filled' : 'empty'}`}
          style={{
            width: width,
            height: height,
            marginRight: spacing,
          }}
        />
      ))}
    </div>
  );
}

Star.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  spacing: PropTypes.number,
};
