export default function AddressSection({ address }) {
  const fields = [
    { label: "Village", value: address.village },
    { label: "Tehsil", value: address.tehsil },
    { label: "District", value: address.district },
    { label: "State", value: address.state },
    { label: "Pin Code", value: address.pinCode },
    { label: "GPS Location", value: address.gps },
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

      <div className="sm:col-span-2 mt-4">
        <iframe
          title="Farm Location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            address.gps
          )}&hl=es;z=14&output=embed`}
          className="w-full h-64 rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
