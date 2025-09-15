import { Phone } from 'lucide-react';

export default function InfoCard({ farmer }) {
  return (
    <div className="bg-[var(--color-black-hover)] mt-4 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 hover:shadow-lg transition">

      <div className="flex items-center space-x-4">
        <img
          src={farmer.photo}
          alt="Farmer Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[var(--color-primary)] shadow-md object-cover"
        />
       <div>
  <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)]">
    {farmer.fullName}
  </h2>
  <p className="flex items-center text-gray-600 text-sm sm:text-base mt-1">
    <Phone className="mr-2 text-[var(--color-primary)]" />
    {farmer.phone}
  </p>
</div>
      </div>

      <span
        className={`mt-4 sm:mt-0 px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-md ${
          farmer.status === "Active"
            ? "bg-[var(--color-primary)] text-[var(--color-white)]"
            : "bg-[var(--color-secondary)] text-[var(--color-white)]"
        }`}
      >
        {farmer.status}
      </span>
    </div>
  );
}
