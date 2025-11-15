const DetailItem = ({
  title,
  subtitle,
  value,
  icon: Icon,
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm shadow-inner">
    <div className="flex items-center space-x-3">
      {Icon && <Icon className="w-5 h-5 text-[var(--color-secondary)]" />}
      <div>
        <div className="font-semibold text-gray-700">{title}</div>
        {subtitle && (
          <div className="text-sm text-[var(--color-black)]">{subtitle}</div>
        )}
      </div>
    </div>
    <div className="flex justify-end">
      <div className="text-sm text-[var(--color-black)]">{value}</div>
    </div>
  </div>
);
export default DetailItem;
