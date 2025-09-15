export default function Documents({ supplier }) {
  return (
    <div className="bg-[var(--color-white)] shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
        Documents
      </h3>
      <ul className="space-y-3">
        {supplier.documents.map((doc, i) => (
          <li
            key={i}
            className="flex justify-between items-center border border-[var(--color-black-hover)] p-3 rounded-lg hover:bg-[var(--color-black-hover)] transition"
          >
            <span className="text-[var(--color-black)]">{doc.name}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
                doc.status === "Verified"
                  ? "bg-[var(--color-primary)] text-[var(--color-white)]"
                  : "bg-[var(--color-secondary)] text-[var(--color-white)]"
              }`}
            >
              {doc.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
