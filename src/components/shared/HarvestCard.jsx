import { Edit, MoreVertical, Trash2, X, Thermometer, Calendar } from "lucide-react";
import React, { useState } from "react";
import HarvestBottom from "./HarvestBottom";

function HarvestCard({ cardsData }) {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-4">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="bg-[var(--color-white)] rounded-2xl border overflow-hidden flex flex-col hover:scale-[1.01] transition-transform duration-100"
        >
          {/* Image with responsive aspect ratio */}
          <div className="w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
            <img
              className="w-full h-full object-cover"
              src={card.image}
              alt={`${card.Title} - ${card.variety}`}
            />
          </div>

          {/* Card Content */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              {/* Orchard and Menu */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-base sm:text-lg font-bold text-[var(--color-black)] truncate max-w-[70%]">
                  {card.Orchard}
                </p>

                {/* Three dots menu */}
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(index)}
                    className="p-1 rounded-full bg-[var(--color-black-hover)] text-[var(--color-black)] shadow"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {menuOpen === index && (
                    <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-[var(--color-white)] shadow-lg rounded-lg border z-20">
                      <button className="flex items-center gap-2 w-full px-3 sm:px-4 py-2 text-[var(--color-black)] hover:bg-[var(--color-black-hover)]">
                        <Edit size={18} /> Edit
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 sm:px-4 py-2 text-[var(--color-error)] hover:bg-[var(--color-error)]">
                        <Trash2 size={18} /> Delete
                      </button>
                      <button
                        onClick={() => setMenuOpen(null)}
                        className="flex items-center gap-2 w-full px-3 sm:px-4 py-2 text-[var(--color-black)] hover:bg-[var(--color-black-hover)]"
                      >
                        <X size={18} /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Temperature */}
              {(card.date || card.temperature) && (
                <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm mt-3 gap-2">
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

              {/* Title & variety */}
              <div className="flex flex-col mt-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--color-black)] truncate">
                    {card.Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-secondary)] bg-[var(--color-black-hover)] border rounded-lg px-2 py-0.5">
                    {card.variety}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-black)] mt-1 truncate">
                  {card.Location}
                </p>
              </div>
            </div>

            {/* Reusable Bottom Component */}
            <HarvestBottom boxes={card.Boxes} workers={card.Workers} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HarvestCard;
