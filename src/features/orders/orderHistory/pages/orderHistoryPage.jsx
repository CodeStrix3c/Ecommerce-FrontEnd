import { useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderHistoryCard";
import orders from "../../DemoData";

export default function OrderHistoryPage() {
  const navigate = useNavigate();

  const uniqueOrders = Array.from(
    new Map(orders.map((o) => [o.orderId, o])).values()
  );

  return (
    <div className=" pt-8 lg:pt-36">
      <h2 className="text-lg font-semibold">All Orders</h2>

      <div className="space-y-4 p-4">
        {uniqueOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            status={order.status}
            statusColor={order.statusColor}
            amount={order.amount}
            date={order.date}
            refunded={order.refunded} 
            
            // refundDetailsLabel={order.refundDetailsLabel}
            products={order.products}
            onViewDetails={() =>
              navigate(`/user-orders/${order.orderId}`)
            } 
          />
        ))}
      </div>
    </div>
  );
}
