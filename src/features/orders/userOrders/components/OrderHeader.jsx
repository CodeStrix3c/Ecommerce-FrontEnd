
import {
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  Package,
} from "lucide-react";

export default function OrderHeader({ order }) {
 
  const getStatusIcon = (status) => {
   switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-[var(--color-primary)]"  />;
      case "shipped":
      case "in transit":
        return <Truck className="w-4 h-4 text-[var(--color-secondary-hover)]" />;
      case "pending":
        return <Clock className="w-4 h-4 text-[var(--color-primary-hover)]" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-[var(--color-error)]" />;
      case "returned":
        return <RotateCcw className="w-4 h-4 text-[var(--color-secondary)]" />;
      case "refunded":
        return <RefreshCcw className="w-4 h-4 text-[var(--color-black)]" />;
      default:
        return <Package className="w-4 h-4 text-[var(--color-gray)]" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-2 text-sm border-b pb-1">
      <div className="flex items-center gap-2">
        {getStatusIcon(order.status)}
        <p className={`font-medium capitalize ${order.statusColor}`}>
          {order.status}
        </p>
        <p className="text-gray-500">{order.date}</p>
      </div>

      <p className="text-gray-700 font-medium">
        Amount: <span className="text-black">{order.amount}</span>
      </p>
    </div>
  );
}
  