// src/components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div
      className="mt-[50px] ml-[50px] w-[1300px] h-[20px] bg-gray-300 rounded-full overflow-hidden border border-red-500"
    >
      <div
        className="h-full rounded-full transition-all duration-300 ease-in-out bg-[#4FD1C5]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
