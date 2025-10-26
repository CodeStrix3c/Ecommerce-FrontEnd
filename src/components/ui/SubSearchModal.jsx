import { Home, Search } from "lucide-react";

function SubSearchModal() {
  return (
    <div className="mx-auto w-full max-w-lg flex flex-col items-center gap-2 rounded-2xl bg-[var(--color-white)] px-4 py-3 ring-1 ring-[var(--color-gray)] sm:flex-row sm:justify-between sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-1">
        <Home className="h-6 w-6 text-[var(--color-secondary)]" />
        <p className="text-[var(--color-black)] font-semibold text-sm">
          Crop Type
        </p>
      </div>

      <div className="hidden sm:block text-[var(--color-black)] opacity-30">
        |
      </div>

      <div>
        <p className="text-[var(--color-black)] font-semibold text-sm">
          Any location
        </p>
      </div>

      <div className="hidden sm:block text-[var(--color-black)] opacity-30">
        |
      </div>

      <div>
        <p className="text-[var(--color-black)] font-semibold text-sm">
          Add Orchards
        </p>
      </div>

      <div className="ms-2 sm:ms-4">
        <Search className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[var(--color-primary)] p-1 text-[var(--color-white)]" />
      </div>
    </div>
  );
}

export default SubSearchModal;
