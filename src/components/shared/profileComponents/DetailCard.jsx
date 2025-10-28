const DetailCard = ({ title, headerButton, children, icon: Icon }) => (
  <div className="p-6 bg-white rounded-sm shadow-sm border border-[var(--color-gray)]">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex items-center justify-center">
            <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
          </div>
        )}
        <h3 className="text-xl font-semibold text-[var(--color-black)]">
          {title}
        </h3>
      </div>

      {headerButton && <div>{headerButton}</div>}
    </div>

    <div className="space-y-3">{children}</div>
  </div>
);

export default DetailCard;
