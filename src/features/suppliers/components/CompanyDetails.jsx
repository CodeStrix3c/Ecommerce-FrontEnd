export default function CompanyDetails({ supplier }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Company Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><strong>Industry:</strong> {supplier.industry}</p>
        <p><strong>Established:</strong> {supplier.established}</p>
        <p><strong>Registration No.:</strong> {supplier.registrationNo}</p>
        <p><strong>Address:</strong> {supplier.address}</p>
        <p><strong>Email:</strong> {supplier.email}</p>
        <p><strong>Phone:</strong> {supplier.phone}</p>
        <p><strong>Website:</strong> {supplier.website}</p>
      </div>
    </div>
  );
}
