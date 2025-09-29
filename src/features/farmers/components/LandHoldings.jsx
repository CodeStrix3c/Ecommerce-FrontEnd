export default function LandHoldings({ holdings }) {
  const fields = [
    { label: "Soil Type", value: holdings.soilType },
    { label: "Irrigation Method", value: holdings.irrigation },
    { label: "Environment Type", value: holdings.environment },
    { label: "Topography", value: holdings.topography },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((field, index) => (
        <div key={index}>
          <p className="text-sm text-gray-600">{field.label}</p>
          <p className="text-base font-semibold text-[var(--color-primary)]">
            {field.value}
          </p>
        </div>
      ))}
    </div>
  );
}
