import React from "react";

const Preselection = ({ isPreselected, setIsPreselected, accessory }) => {
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsPreselected(checked);
  };

  // Use default values if accessory prop is not provided
  const title = accessory?.title || "Headphone Case";
  const price = accessory?.price || 5;
  const description = accessory?.description || "Protect your headphones with this durable case";
  const image = accessory?.image || "/src/assets/headphone-case.png";

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          id="accessory-item"
          checked={isPreselected}
          onChange={handleCheckboxChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <label
            htmlFor="accessory-item"
            className="font-medium text-gray-800 cursor-pointer"
          >
            Add {title} for ${price.toFixed(2)}
          </label>
          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Preselection;
