
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
        return <CheckCircle className="text-green-600 w-5 h-5" />;
      case "shipped":
      case "in transit":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "pending":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "cancelled":
        return <XCircle className="text-red-600 w-5 h-5" />;
      case "returned":
        return <RotateCcw className="text-purple-600 w-5 h-5" />;
      default:
        return <Package className="text-gray-500 w-5 h-5" />;
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
