import React from "react";

const HighDemand = ({ count }) => {
  if (!count) return null;

  return (
    <div className="absolute top-0 right-0 bg-grey-800 text-black text-xs font-semibold px-2 py-1 rounded-l-md flex items-center z-10 shadow-lg">
      <span role="img" aria-label="fire" className="mr-1">🔥</span>
      <span>{count} users bought this in the last hour</span>
    </div>
  );
};

export default HighDemand;