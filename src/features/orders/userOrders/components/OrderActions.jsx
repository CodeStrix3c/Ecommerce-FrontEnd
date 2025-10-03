export default function OrderActions({ navigate }) {
  return (
    <div className="flex justify-start sm:justify-start mt-4">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        Back to Orders
      </button>
    </div>
  );
}
