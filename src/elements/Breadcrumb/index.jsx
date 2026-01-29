import React from "react";
import propTypes from "prop-types";
import Button from "elements/Button";
import "./index.scss";

export default function Breadcrumb(props) {
  const className = ["breadcrumb", props.className];
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className={className.join(" ")}>
        {props.data.map((item, index) => {
          const isLast = index === props.data.length - 1;
          return (
            <li
              key={`breadcrumb-${index}`}
              className={`breadcrumb-item${isLast ? " active" : ""}`}
            >
              {isLast ? (
                <span className="breadcrumb-text">{item.pageTitle}</span>
              ) : (
                <>
                  <Button
                    type="link"
                    href={item.pageHref}
                    className="text-decoration-none breadcrumb-link"
                  >
                    {item.pageTitle}
                  </Button>
                  <span className="breadcrumb-separator">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  data: propTypes.array.isRequired,
  className: propTypes.string,
};
