const OptionalLabel = ({ label }) => (
  <span className="flex items-center">
    {label}
    <span className="ml-1 text-xs text-[var(--color-black)]">(optional)</span>
  </span>
);

export default OptionalLabel;
