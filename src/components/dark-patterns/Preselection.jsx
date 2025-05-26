import React, { useState } from "react";
import headphoneCaseImage from "../../assets/headphone-case.png"; // Update path as needed

const Preselection = ({ isPreselected, setIsPreselected }) => {
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsPreselected(checked);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          id="headphone-case"
          checked={isPreselected}
          onChange={handleCheckboxChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <label
            htmlFor="headphone-case"
            className="font-medium text-gray-800 cursor-pointer"
          >
            Add headphone case for $5
          </label>
          <p className="text-sm text-gray-500">
            Protect your headphones with this durable case
          </p>
        </div>
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={headphoneCaseImage}
            alt="Headphone Case"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Preselection;
