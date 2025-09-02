import React from 'react';

function SectionTitle({ title, className = '' }) {
  return (
    <h2 className={`text-left text-lg font-semibold sm:text-xl ${className}`}>
      {title}
    </h2>
  );
}

export default SectionTitle;
