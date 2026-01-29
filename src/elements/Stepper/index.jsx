import React, { useState, useCallback } from "react";
import propTypes from "prop-types";

export default function Stepper(props) {
  const { steps, initialStep } = props;
  const stepKeys = Object.keys(steps);

  const [CurrentStep, setCurrentStep] = useState(
    stepKeys.indexOf(initialStep) > -1 ? initialStep : stepKeys[0],
  );
  const totalStep = stepKeys.length;
  const indexStep = stepKeys.indexOf(CurrentStep);

  const prevStep = useCallback(() => {
    if (indexStep > 0) {
      setCurrentStep(stepKeys[indexStep - 1]);
    }
  }, [indexStep, stepKeys]);

  const nextStep = useCallback(() => {
    if (indexStep < totalStep - 1) {
      setCurrentStep(stepKeys[indexStep + 1]);
    }
  }, [indexStep, totalStep, stepKeys]);

  const goToStep = useCallback(
    (stepKey) => {
      if (stepKeys.includes(stepKey)) {
        setCurrentStep(stepKey);
      }
    },
    [stepKeys],
  );

  return (
    <>{props.children(prevStep, nextStep, CurrentStep, steps, goToStep)}</>
  );
}

Stepper.propTypes = {
  steps: propTypes.object.isRequired,
  initialStep: propTypes.string,
  children: propTypes.func.isRequired,
};

export { default as Numbering } from "./Numbering";
export { default as Meta } from "./Meta";
export { default as Controller } from "./Controller";
export { default as MainContent } from "./MainContent";
