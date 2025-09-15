import Card from "./Card";

export default function LandDemographics({ land }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card title="Orchard Size" value={land.orchardSize} />
      <Card title="Farm Size" value={land.farmSize} />
      <Card title="Main Crops" value={land.mainCrops} />
      <Card title="Ownership Type" value={land.ownershipType} />
    </div>
  );
}
