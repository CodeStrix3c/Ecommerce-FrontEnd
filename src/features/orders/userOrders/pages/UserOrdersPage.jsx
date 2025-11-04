import { useParams, useNavigate } from "react-router-dom";
import OrderHeader from "../components/OrderHeader";
import ProductCard from "../components/ProductCard";
import OrderActions from "../components/OrderActions";
import orders from "../../DemoData";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function UserOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const filteredOrders = orders.filter((o) => o.orderId === id);

  if (!filteredOrders.length) {
    return (
    <ContentWrapper compactScreen={true}>

        <div className=" pt-36 text-center">
        <p className="text-gray-500">Order not found</p>
        <button
          className="mt-4 px-4 py-2 bg-[var(--color-secondary)] text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </ContentWrapper>
    );
  }

  return (
    <ContentWrapper compactScreen={true}>

      <div className="lg:pt-36 ">
      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center sm:text-left pt-5">
        Order ID: {id}
      </h2>

      {filteredOrders.map((order, idx) => (
        <div
          key={idx}
          className="p-4 sm:p-6 mb-6 "
        >
          <OrderHeader order={order} />

          <div className="space-y-6">
            {order.products.map((p, i) => (
              <ProductCard
                key={i}
                product={p}
                order={order}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      ))}

      {/* <OrderActions navigate={navigate} /> */}
    </div>
    </ContentWrapper>
  );
}
