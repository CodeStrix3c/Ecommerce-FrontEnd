import React, { forwardRef, useMemo } from "react";

const Invoice = forwardRef(({ order }, ref) => {
  if (!order) return null;

  const calculated = useMemo(() => {
    let subtotal = 0;

    const items = order.orderItems?.map((item) => {

      
      const price =
        item.price ??
        item.unitPrice ??
        item.productPrice ??    
        item.sellingPrice ??     
        (item.rowTotal && item.quantity
          ? item.rowTotal / item.quantity
          : 0);

      
      const quantity = item.quantity ?? item.qty ?? 1;

     
      const total =
        item.total ??
        item.rowTotal ??
        item.lineTotal ??
        price * quantity;

      subtotal += total;

      return {
        ...item,
        price,
        quantity,
        total,
      };
    }) || [];

    return {
      items,
      subtotal:
        order.subtotal ??
        order.subTotal ??   
        subtotal,
    };
  }, [order]);

  const address = order.shippingAddress;

  return (
    <div
      ref={ref}
      className="max-w-5xl mx-auto bg-white p-6 text-sm text-gray-800"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-xl font-bold">Tax Invoice</h1>
        <div className="text-right text-xs text-gray-600">
          <p>
            Order ID: <span className="font-medium">ORD-{order.id}</span>
          </p>
          <p>
            Order Date:{" "}
            {new Date(order.createdOn).toLocaleDateString("en-IN")}
          </p>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Billing */}
        <div>
          <h2 className="font-semibold mb-1">Billing Address</h2>
          {address ? (
            <>
              <p className="font-medium">{address.contactName}</p>
              <p className="text-gray-600">{address.phone}</p>
              <p className="text-gray-600 mt-1">
                {address.addressLine1}
              </p>
              {address.addressLine2 && (
                <p className="text-gray-600">
                  {address.addressLine2}
                </p>
              )}
              <p className="text-gray-600">
                {address.cityName ?? address.city},{" "}
                {address.stateOrProvinceName ?? address.state}
              </p>
              <p className="text-gray-600">{address.zipCode}</p>
            </>
          ) : (
            <p className="text-gray-500">No address available</p>
          )}
        </div>

        {/* Shipping */}
        <div>
          <h2 className="font-semibold mb-1">Shipping Address</h2>
          {address ? (
            <>
              <p className="font-medium">{address.contactName}</p>
              <p className="text-gray-600">{address.phone}</p>
              <p className="text-gray-600 mt-1">
                {address.addressLine1}
              </p>
              {address.addressLine2 && (
                <p className="text-gray-600">
                  {address.addressLine2}
                </p>
              )}
              <p className="text-gray-600">
                {address.cityName ?? address.city},{" "}
                {address.stateOrProvinceName ?? address.state}
              </p>
              <p className="text-gray-600">{address.zipCode}</p>
            </>
          ) : (
            <p className="text-gray-500">No address available</p>
          )}
        </div>
      </div>

      {/* ITEMS */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-center">Unit Price</th>
              <th className="p-3 text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {calculated.items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  {item.thumbnailImage && (
                    <img
                      src={item.thumbnailImage}
                      alt={item.productName}
                      className="w-12 h-12 object-cover border rounded"
                    />
                  )}
                  <span>{item.productName ?? "Item"}</span>
                </td>

                <td className="p-3 text-center">
                  {item.quantity}
                </td>

                <td className="p-3 text-center">
                  ₹{item.price.toFixed(2)}
                </td>

                <td className="p-3 text-center font-medium">
                  ₹{item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTAL */}
      <div className="flex justify-end mt-6">
        <div className="w-72 border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between py-1">
            <span>Item Subtotal</span>
            <span>₹{calculated.subtotal.toFixed(2)}</span>
          </div>

          {order.taxAmount !== undefined && (
            <div className="flex justify-between py-1">
              <span>Tax</span>
              <span>₹{Number(order.taxAmount).toFixed(2)}</span>
            </div>
          )}

          {order.shippingAmount !== undefined && (
            <div className="flex justify-between py-1">
              <span>Shipping</span>
              <span>₹{Number(order.shippingAmount).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between py-2 border-t mt-2 font-semibold text-base">
            <span>Order Total</span>
            <span>
              ₹
              {(
                calculated.subtotal +
                Number(order.taxAmount || 0) +
                Number(order.shippingAmount || 0)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 text-xs text-gray-500 border-t pt-4">
        <p>This is a system-generated invoice. No signature required.</p>
      </div>
    </div>
  );
});

export default Invoice;