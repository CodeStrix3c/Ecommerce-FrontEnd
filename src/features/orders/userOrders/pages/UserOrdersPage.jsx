// UserOrderDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import OrderHeader from "../components/OrderHeader";
import ProductCard from "../components/ProductCard";
import OrderActions from "../components/OrderActions";
import orders from "../../DemoData";



export default function UserOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const filteredOrders = orders.filter((o) => o.orderId === id);

  if (!filteredOrders.length) {
    return (
      <div className="mx-auto lg:pt-36 p-4 text-center">
        <p className="text-gray-500">Order not found</p>
        <button
          className="mt-4 px-4 py-2 bg-[var(--color-secondary)] text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="lg:mx-44 py-4 bg-white  shadow-sm">
  <h2 className="text-lg font-semibold mb-6">Order ID: {id}</h2>

  {filteredOrders.map((order, idx) => (
    <div
      key={idx}
      className="border p-4 mb-6 bg-[var(--color-black-hover)] "
    >
      <OrderHeader order={order} />

      <div className="space-y-6">
        {order.products.map((p, i) => (
          <ProductCard key={i} product={p} order={order} navigate={navigate} />
        ))}
      </div>
    </div>
  ))}

  <OrderActions navigate={navigate} />
</div>

  );
}
