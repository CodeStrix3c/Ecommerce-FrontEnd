const SectionCard = ({ title, children }) => {
  return (
    <div
      className="rounded-lg p-5 space-y-4 shadow-sm
                 bg-[var(--color-white)]
                 border border-[var(--color-gray)]"
    >
      <h2
        className="text-lg font-semibold pb-2 border-b
                   text-[var(--color-black)]
                   border-[var(--color-gray)]"
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SectionCard;