import React, { useState } from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function Accordion({
  items,
  allowMultiple = false,
  className = "",
}) {
  const [activeItems, setActiveItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setActiveItems((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index],
      );
    } else {
      setActiveItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`accordion-wrapper ${className}`}>
      {items.map((item, index) => {
        const isActive = activeItems.includes(index);
        return (
          <div
            key={index}
            className={`accordion-item ${isActive ? "active" : ""}`}
          >
            <button
              className="accordion-header"
              onClick={() => toggleItem(index)}
              aria-expanded={isActive}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={isActive ? "rotate" : ""}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              id={`accordion-content-${index}`}
              className="accordion-content"
              style={{
                maxHeight: isActive ? "500px" : "0",
              }}
            >
              <div className="accordion-body">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Accordion.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.string.isRequired,
      content: propTypes.node.isRequired,
    }),
  ).isRequired,
  allowMultiple: propTypes.bool,
  className: propTypes.string,
};
