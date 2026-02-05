import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center gap-3">
      {/* Previous */}
      <button
        onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full border disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 w-9 rounded-full text-sm font-medium border
              ${
                page === currentPage
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
