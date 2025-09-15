import Card from "./Card";

export default function LandHoldings({ holdings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card title="Soil Type" value={holdings.soilType} />
      <Card title="Irrigation Method" value={holdings.irrigation} />
      <Card title="Environment Type" value={holdings.environment} />
      <Card title="Topography" value={holdings.topography} />
    </div>
  );
}
