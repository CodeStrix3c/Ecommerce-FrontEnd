import Card from "./Card";

export default function AddressSection({ address }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card title="Village" value={address.village} />
      <Card title="Tehsil" value={address.tehsil} />
      <Card title="District" value={address.district} />
      <Card title="State" value={address.state} />
      <Card title="Pin Code" value={address.pinCode} />
      <Card title="GPS Location" value={address.gps} />

      <div className="sm:col-span-2 mt-4">
        <div className="bg-[var(--color-white)] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-2">
          <iframe
            title="Farm Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              address.gps
           )}&hl=es;z=14&output=embed`}
            className="w-full h-64 rounded-lg border"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
