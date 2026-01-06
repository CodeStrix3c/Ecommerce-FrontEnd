import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OrderHeader from "../components/OrderHeader";
import ProductCard from "../components/ProductCard";
import orders from "../../DemoData";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useOrderHistoryDataQuery } from "@/hooks/useOrderHistoryQuery";

export default function UserOrderDetailsPage() {

  const { data: response } = useOrderHistoryDataQuery();
  const orders = response || [];

  const { id } = useParams();
  const navigate = useNavigate();

  const filteredOrders = orders.filter((o) => o.orderId === id);

  

  

  if (!filteredOrders.length) {
    return (
      <ContentWrapper compactScreen={true}>
        <div className="pt-36 text-center ">
          <p className="text-gray-500">Order not found</p>
          <button
            className="mt-4 px-4 py-2 bg-[var(--color-secondary)] text-white rounded"
            onClick={() => navigate("/user-orders")}
          >
            Go Back
          </button>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper compactScreen={true}>
      <div className="lg:pt-36">
       
        <div className="flex items-center gap-3 pt-5 mb-6">
          <button
            onClick={() => navigate("/orders")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Back to Orders"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold">
            Order ID: {id}
          </h2>
        </div>

        {filteredOrders.map((order, idx) => (
          <div key={idx} className="p-4 sm:p-6 mb-6">
            {/* <OrderHeader order={order} /> */}

            <div className="space-y-6">
              {order.products.map((p, i) => (
                <ProductCard key={i} product={p} order={order} navigate={navigate} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ContentWrapper>
  );
}
