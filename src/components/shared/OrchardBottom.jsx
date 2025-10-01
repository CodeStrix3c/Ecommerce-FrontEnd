import React from 'react';

function OrchardBottom({ title = "Summary", details = [] }) {
  return (
    <div className="px-3 py-2 border rounded-lg my-6 bg-white shadow-sm">
      {/* Row 1: Title */}
      <div>
        <h1 className="text-[var(--color-black)] text-2xl font-bold pb-2 ms-3">
          {title}
        </h1>
      </div>

      {/* Row 2: Details */}
      <div className="flex justify-between px-3">
        {details.map((item, index) => (
          <div key={index} className={`text-[var(--color-black)]`}>
            {item.label}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrchardBottom;
