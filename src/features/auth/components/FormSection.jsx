export default function FormSection({
  title,
  children,
  actionText,
  onActionClick,
}) {
  return (
    <section className="mb-2">
      <h2 className="text-lg font-semibold text-[var(--color-black)] mb-4">
        {title}{" "}
        {actionText && (
          <span
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] cursor-pointer"
            onClick={onActionClick}
          >
            ({actionText})
          </span>
        )}
      </h2>
      {children}
    </section>
  );
}
