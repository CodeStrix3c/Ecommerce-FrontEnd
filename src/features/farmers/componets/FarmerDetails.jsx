import Card from "./Card";

export default function FarmerDetails({ farmer }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card title="Full Name" value={farmer.fullName} />
      <Card title="Email" value={farmer.email} />
      <Card title="Phone" value={farmer.phone} />
      <Card title="Status" value={farmer.status} />
    </div>
  );
}
