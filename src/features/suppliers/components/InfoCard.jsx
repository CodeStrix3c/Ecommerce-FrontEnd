export default function InfoCard({ supplier }) {
    
  return (
    <div className="bg-green-200 mt-4 bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex items-center space-x-4">
        <img
          src={supplier.logo}
          alt="Supplier Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-fill"
        />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {supplier.companyName}
          </h2>
          <p className="text-gray-900 text-sm sm:text-base">
            Contact: {supplier.contactPerson}
          </p>
        </div>
      </div>

      <span
        className={`mt-4 sm:mt-0 px-4 py-1 rounded-full text-sm font-medium shadow ${
          supplier.status === "Active"
            ? "bg-[var(--color-primary)] text-white"
            : "bg-[var(--color-secondary)] text-white"
        }`}
      >
        {supplier.status}
      </span>
    </div>
  );
}
