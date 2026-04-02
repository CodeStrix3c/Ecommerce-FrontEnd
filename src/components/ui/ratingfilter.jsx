import { Star } from "lucide-react";

const RatingFilter = ({ selectedRating, onChange }) => {
  const rows = [4, 3, 2, 1]; // Amazon shows 4★ & up first

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
        Avg. Customer Review
      </p>

      {rows.map((star) => (
        <button
          key={star}
          onClick={() => onChange(star === selectedRating ? 0 : star)}
          className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all
            ${
              selectedRating === star
                ? "bg-yellow-50 border border-yellow-300"
                : "hover:bg-gray-50 border border-transparent"
            }`}
        >
          {/* STARS */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={
                  s <= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>

          <span className="text-xs text-gray-600 whitespace-nowrap">& Up</span>

          {selectedRating === star && (
            <span className="ml-auto text-xs text-yellow-600 font-semibold">
              ✓
            </span>
          )}
        </button>
      ))}

      {/* CLEAR */}
      {selectedRating > 0 && (
        <button
          onClick={() => onChange(0)}
          className="mt-1 text-xs text-blue-600 hover:underline text-left px-2"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default RatingFilter;
