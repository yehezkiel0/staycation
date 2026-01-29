import React from "react";
import { Fade } from "react-awesome-reveal";
import propTypes from "prop-types";
import "./index.scss";

export default function Numbering({ style, className, data, current }) {
  const KeysOfData = Object.keys(data);
  const currentKeyIndex = KeysOfData.indexOf(current); // Calculate current index

  return (
    <Fade>
      <ol className={["stepper", className].join(" ")} style={style}>
        {KeysOfData.map((list, index) => {
          let output = "active";
          if (index < currentKeyIndex) output = "completed"; // Previous steps
          if (index === currentKeyIndex) output = "active"; // Current step
          if (index > currentKeyIndex) output = ""; // Future steps

          // Hide the last item if it's just a spacer or end marker (logic from original code: if index+1 === length return null)
          // Original: if (index + 1 === KeysOfData.length) { isActive = ""; return null; }
          // We'll keep that if it's intended to hide the "Completed" step from the stepper bar itself?
          // Actually, steps usually has 'booking -> payment -> completed'.
          // If 'completed' is the last step, we might not want a number for it?
          // The current code hides the last key. I will preserve that behavior.
          if (index + 1 === KeysOfData.length) {
            return null;
          }

          return (
            <li key={`list-${index}`} className={[output].join(" ")}>
              {/* Show checkmark logic is in CSS usually, but here we render number always? 
                  CSS hides number if checkmark? 
                  Actually, if it's completed, we likely want the checkmark.
                  If active, we want the number.
              */}
              {index + 1}
            </li>
          );
        })}
      </ol>
    </Fade>
  );
}

Numbering.propTypes = {
  className: propTypes.string,
  data: propTypes.object,
  current: propTypes.string,
};
