export default function BankDetails({ supplier }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><strong>Bank Name:</strong> {supplier.bank.bankName}</p>
        <p><strong>Account Holder:</strong> {supplier.bank.accountHolder}</p>
        <p><strong>Account Number:</strong> {supplier.bank.accountNumber}</p>
        <p><strong>IFSC Code:</strong> {supplier.bank.ifsc}</p>
      </div>
    </div>
  );
}
