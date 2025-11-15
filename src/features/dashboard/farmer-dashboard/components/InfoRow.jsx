export default function InfoRow({ label, value, unit, statusColor, Icon }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 py-2">
      <span className="text-sm text-gray-500 font-medium flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
        {label}
      </span>
      <span
        className={`font-semibold text-sm`}
        style={{ color: statusColor || "var(--color-black)" }}
      >
        {value} {unit}
      </span>
    </div>
  );
}
