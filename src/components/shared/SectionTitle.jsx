export default function SectionTitle({
  title,
  className = "",
  centered = false,
}) {
  return (
    <h2
      className={`
        ${centered ? "text-center" : "text-left"}
        text-lg font-semibold sm:text-xl text-[var(--color-black)] ${className}
      `}
    >
      {title}
    </h2>
  );
}
