export default function Card({ title, value }) {
  return (
    <div className="bg-[var(--color-white)] border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h4 className="text-sm font-medium text-[var(--color-secondary)]">
        {title}
      </h4>
      <p className="text-[var(--color-black)] font-semibold">{value}</p>
    </div>
  );
}
