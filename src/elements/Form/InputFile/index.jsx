import React, { useRef, useState } from "react";
import propTypes from "prop-types";

import "./index.scss";

export default function File({
  value,
  placeholder = "Browse a file...",
  name,
  accept,
  prepend,
  append,
  outerClassName,
  inputClassName,
  onChange,
}) {
  const refInputFile = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    // Extract filename for display
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
    // Propagate the event up
    if (onChange) onChange(event);
  };

  // If value prop is standard "C:\fakepath\...", prefer internal fileName if available, or clean up value.
  // Actually, usually we can't control file input value.
  // We'll trust the checked-out "value" prop is effectively the text to display.
  // The user passed `data.proofPayment`.

  const displayValue =
    value && typeof value === "object" && value.name ? value.name : value;

  return (
    <div className={["input-text mb-3", outerClassName].join(" ")}>
      <div
        className="input-group"
        onClick={() => refInputFile.current.click()}
        style={{ cursor: "pointer" }}
      >
        {prepend && (
          <div className="input-group-prepend bg-gray-900">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          accept={accept}
          ref={refInputFile}
          name={name}
          className="d-none"
          type="file"
          // DO NOT set value on type="file" inputs programmatically to anything other than empty string
          onChange={handleFileChange}
        />
        <div
          className={[
            "form-control d-flex align-items-center",
            inputClassName,
          ].join(" ")}
          style={{ minHeight: 48, backgroundColor: "#F5F6F8" }}
        >
          <span
            className={
              displayValue || fileName ? "text-dark" : "text-secondary"
            }
          >
            {displayValue || fileName || placeholder}
          </span>
          <div className="ms-auto" style={{ color: "#1ABC9C" }}>
            <i className="fas fa-upload"></i>
          </div>
        </div>
        {append && (
          <div className="input-group-append bg-gray-900">
            <span className="input-group-text">{append}</span>
          </div>
        )}
      </div>
    </div>
  );
}

File.propTypes = {
  name: propTypes.string.isRequired,
  accept: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.object]),
  onChange: propTypes.func.isRequired,
  prepend: propTypes.oneOfType([propTypes.number, propTypes.string]),
  append: propTypes.oneOfType([propTypes.number, propTypes.string]),
  type: propTypes.string,
  placeholder: propTypes.string,
  outerClassName: propTypes.string,
  inputClassName: propTypes.string,
};
