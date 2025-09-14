export default function BusinessStats({ supplier }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Business Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm">
          <p className="text-2xl font-bold">{supplier.products}</p>
          <p className="text-gray-600 text-sm">Products</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm">
          <p className="text-2xl font-bold">{supplier.totalOrders}</p>
          <p className="text-gray-600 text-sm">Total Orders</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm">
          <p className="text-2xl font-bold">{supplier.pendingOrders}</p>
          <p className="text-gray-600 text-sm">Pending</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm">
          <p className="text-2xl font-bold">{supplier.completedOrders}</p>
          <p className="text-gray-600 text-sm">Completed</p>
        </div>
      </div>
      <div className="mt-4">
        <p ><strong>Rating:</strong> ⭐ {supplier.rating}/5</p>
      </div>
    </div>
  );
}
