import React, { useState } from "react";

interface StepperProps {
  numberOfSteps: number;
  currentPage: number; // Add currentPage prop
}

const Stepper2: React.FC<StepperProps> = ({ numberOfSteps, currentPage }) => {
  const [currentStep, setCurrentStep] = useState<number>(currentPage);

  const activeColor = (index: number): string =>
    currentStep <= index ? "bg-marromclaro" : "bg-marromclaro/[.3]";
  const isFinalStep = (index: number): boolean => index === numberOfSteps - 1;

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="flex items-center rotate-180">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`w-4 h-4 rounded-full ${activeColor(index)}`}></div>
          {isFinalStep(index) ? null : (
            <div className={`w-12 h-1 ${activeColor(index)}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper2;
