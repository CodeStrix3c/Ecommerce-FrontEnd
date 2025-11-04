import React from "react";

export default function ReviewTags() {
  const tags = ["Great hospitality", "Clean", "Quiet area", "Value for money"];

  const handleClick = (tag) => {
    console.log(`Clicked on: ${tag}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleClick(tag)}
            className="px-4 py-2 text-sm rounded-full 
                        text-[var(--color-black)]
                       transition-colors duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
