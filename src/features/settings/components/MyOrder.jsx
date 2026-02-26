import React, { useState } from "react";

const orders = [
  {
    id: "HC1001",
    date: "22 Feb 2026",
    status: "Delivered",
    total: 1850,
    items: [
      {
        name: "Handmade Wooden Bowl",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400",
        price: 850,
        qty: 1,
        artisan: "Kashmir Woodcraft",
        description:
          "Hand-carved walnut wood bowl made by traditional Kashmiri artisans.",
      },
      {
        name: "Hand Embroidered Cushion Cover",
        image:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        price: 1000,
        qty: 1,
        artisan: "Local Artisan Group",
        description:
          "Beautifully hand-embroidered cushion cover using traditional patterns.",
      },
    ],
  },
  {
    id: "HC1002",
    date: "18 Feb 2026",
    status: "Processing",
    total: 1200,
    items: [
      {
        name: "Terracotta Decorative Vase",
        image:
          "https://images.unsplash.com/photo-1598300056393-4aac492f4344",
        price: 1200,
        qty: 1,
        artisan: "Rural Pottery Artist",
        description:
          "Eco-friendly handmade terracotta vase crafted using traditional pottery techniques.",
      },
    ],
  },
];

const MyOrder = () => {
  const [openItem, setOpenItem] = useState(null);

  const handleViewDetails = (orderId, index) => {
    const key = `${orderId}-${index}`;
    setOpenItem(openItem === key ? null : key);
  };

  
  return (
    <div className="max-w-5xl mx-auto p-4 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--color-black)]">
        My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg mb-6 bg-white shadow-sm overflow-hidden"
        >
          {/* Order Header */}
          <div className="flex flex-wrap justify-between items-center bg-[#f8f5f2] p-4 text-sm">
            <div>
              <p className="font-medium">Order Date</p>
              <p>{order.date}</p>
            </div>

            <div>
              <p className="font-medium">Total</p>
              <p>₹{order.total}</p>
            </div>

            <div>
              <p className="font-medium">Order ID</p>
              <p>{order.id}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Order Items */}
          <div className="p-4 space-y-4">
            {order.items.map((item, index) => {
              const key = `${order.id}-${index}`;
              const isOpen = openItem === key;

              return (
                <div
                  key={index}
                  className="border-b pb-4 last:border-b-0"
                >
                  {/* Item Basic Info */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md border"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Artisan: {item.artisan}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} | ₹{item.price}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 self-start sm:self-center">
                      <button
                        onClick={() =>
                          handleViewDetails(order.id, index)
                        }
                        className="border px-3 py-1 text-sm rounded hover:bg-gray-100"
                      >
                        {isOpen ? "Hide Details" : "View Details"}
                      </button>

                      {order.status === "Delivered" && (
                        <button
                          onClick={() => handleBuyAgain(item)}
                          className="border px-3 py-1 text-sm rounded hover:bg-gray-100"
                        >
                          Buy Again
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Detail Section */}
                  {isOpen && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-md text-sm">
                      <div className="grid sm:grid-cols-2 gap-2">
                        <p>
                          <span className="font-medium">Product:</span>{" "}
                          {item.name}
                        </p>
                        <p>
                          <span className="font-medium">Artisan:</span>{" "}
                          {item.artisan}
                        </p>
                        <p>
                          <span className="font-medium">Price:</span> ₹
                          {item.price}
                        </p>
                        <p>
                          <span className="font-medium">Quantity:</span>{" "}
                          {item.qty}
                        </p>
                        <p>
                          <span className="font-medium">Subtotal:</span> ₹
                          {item.price * item.qty}
                        </p>
                      </div>

                      <p className="mt-3 text-gray-600">
                        {item.description}
                      </p>

                     
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;