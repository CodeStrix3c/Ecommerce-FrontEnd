export default function SectionTitle({
  title,
  className = "",
  centered = false,
}) {
  return (
    <h2
      className={`
        ${centered ? "text-center" : "text-left"} sm:text-xl
         font-bold text-[var(--color-black)] ${className}
      `}
    >
      {title}
    </h2>
  );
}
