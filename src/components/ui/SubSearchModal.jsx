import { Home, Search } from 'lucide-react';

function SubSearchModal() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-2 rounded-2xl bg-white px-4 py-2 pt-3 ring-1 ring-gray-200 sm:flex-row sm:justify-between sm:gap-4">
      <div className="ms-7 flex items-center">
        <Home className="me-1 h-6 w-6 text-[var(--color-secondary)]" />
        <p className="font-semibold">Anywhere</p>
      </div>

      <div className="text-gray-300">|</div>

      <div>
        <p className="font-semibold">Any week</p>
      </div>

      <div className="text-gray-300">|</div>

      <div className="font-semibold">Add guests</div>

      <div className="ms-2">
        <Search className="h-7 w-7 rounded-full bg-[var(--color-accent)] p-1 text-white" />
      </div>
    </div>
  );
}

export default SubSearchModal;
