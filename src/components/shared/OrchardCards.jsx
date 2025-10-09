import { Edit, MoreVertical, Trash2, X, Thermometer, Calendar } from "lucide-react";
import React, { useState } from "react";

function OrchardCards({ cardsData }) {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-4">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="bg-[var(--color-white)] rounded-2xl shadow-lg overflow-hidden relative"
        >
          {/* Image */}
          <img
            className="w-full h-48 sm:h-60 object-cover"
            src={card.image}
            alt={card.Title}
          />

          {/* Top left button */}
          <div className="absolute top-3 left-3">
            <p className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm font-semibold bg-[var(--color-black-hover)] text-[var(--color-primary)] rounded-lg shadow-md">
              {card.buttonIcon && <card.buttonIcon size={14} />}
              {card.buttonText || "Growing"}
            </p>
          </div>

          {/* Menu top right */}
          <div className="absolute top-3 right-3">
            <button
              onClick={() => toggleMenu(index)}
              className="p-2 rounded-full bg-[var(--color-black-hover)] text-[var(--color-black)] shadow"
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen === index && (
              <div className="absolute right-0 mt-2 w-40 bg-[var(--color-white)] shadow-lg rounded-lg border z-10">
                <button className="flex items-center gap-2 w-full px-4 py-2 text-[var(--color-black)] ">
                  <Edit size={18} /> Edit
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-[var(--color-primary)] hover:bg-gray-100">
                  <Trash2 size={18} /> Delete
                </button>
                <button
                  onClick={() => setMenuOpen(null)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-[var(--color-black)] "
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-4">
            {/* Title & variety */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-[var(--color-black)]">
                  {card.Title}
                </h3>
                <p className="text-xs text-[var(--color-secondary)] bg-[var(--color-black-hover)] border rounded-lg px-2 py-1">
                  {card.variety}
                </p>
              </div>
              <p className="text-sm text-[var(--color-black)] mt-1">
                {card.Location}
              </p>
            </div>

            {/* Acres and details */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-[var(--color-black)]">{card.Acres}</p>
              <button className="text-sm text-[var(--color-primary)]">
                {card.Details}
              </button>
            </div>

            {/* Trees */}
            <div className="flex justify-center mt-2">
              <p className="text-sm text-[var(--color-black)]">{card.Trees}</p>
            </div>

            {/* Date & Temperature */}
            {(card.date || card.temperature) && (
              <div className="flex justify-between items-center text-sm">
                {card.date && (
                  <span className="flex items-center gap-1 text-[var(--color-black)]">
                    <Calendar size={14} className="text-[var(--color-primary)]" />
                    {card.date}
                  </span>
                )}
                {card.temperature && (
                  <span className="flex items-center gap-1 text-[var(--color-black)]">
                    <Thermometer size={14} className="text-[var(--color-primary)]" />
                    {card.temperature}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrchardCards;
