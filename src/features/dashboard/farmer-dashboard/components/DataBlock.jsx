export default function DataBlock({
  title,
  subtitle,
  color,
  className = "",
  children,
}) {
  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md border border-gray-100 transition duration-300 hover:shadow-lg ${className}`}
    >
      <div className="mb-3 pb-1 border-b border-gray-200">
        <h2
          className="text-base font-bold text-gray-800"
          style={{ color: color }}
        >
          {title}
        </h2>
        <p className="text-[10px] text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
