export default function LandDemographics({ land }) {
  const fields = [
    { label: "Orchard Size", value: land.orchardSize },
    { label: "Farm Size", value: land.farmSize },
    { label: "Main Crops", value: land.mainCrops },
    { label: "Ownership Type", value: land.ownershipType },
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
