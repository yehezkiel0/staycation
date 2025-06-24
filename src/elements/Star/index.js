import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export default function Star({ className, value, height, width, spacing }) {
  const normalizedValue = Math.min(Math.max(Number(value) || 0, 0), 5);
  
  const stars = [];
  
  for (let index = 0; index < 5; index++) {
    const starValue = normalizedValue - index;
    let starIcon;
    
    if (starValue >= 1) {
      starIcon = "fas fa-star"; // Filled star
    } else if (starValue >= 0.5) {
      starIcon = "fas fa-star-half-alt"; // Half star
    } else {
      starIcon = "far fa-star"; // Empty star
    }
    
    stars.push(
      <i
        key={`star-${index}`}
        className={`${starIcon} star-icon`}
        style={{
          fontSize: `${Math.max(width, height)}px`,
          marginRight: index < 4 ? `${spacing}px` : 0,
          color: starValue > 0 ? '#ffc107' : '#dee2e6',
        }}
      />
    );
  }

  return (
    <div 
      className={["stars", className].join(" ")} 
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
      }}
    >
      {stars}
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
