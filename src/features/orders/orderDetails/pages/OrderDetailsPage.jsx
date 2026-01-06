import ContentWrapper from "@/components/shared/ContentWrapper";
import HelpButton from "../components/HelpButton";
import OrderIdSection from "../components/OrderIdSection";
import OrderStatus from "../components/OrderStatus";
import PriceSection from "../components/PriceSection";
import ProductCard from "../components/ProductCard";
import ReviewSection from "../components/ReviewSection";
import UpdatesSection from "../components/UpdatesSection";
import { useLocation } from "react-router-dom";

export default function OrderDetailsPage() {
  const { state } = useLocation();

  // extract the correct values
  const order = state?.order;

  // console.log(order,"detalsrder");
  
  const product = state?.product;

  if (!order || !product) {
    return (
      <ContentWrapper compactScreen={true}>
        <div className="pt-36 text-center">
          <p className="text-gray-500">Invalid Order Details</p>
        </div>
      </ContentWrapper>
    );
  }

  const steps = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <ContentWrapper compactScreen={true}>
      <div className="md:pt-24 lg:pt-28 mb-3">
        <HelpButton />

        {/* show clicked product */}
        <ProductCard product={product} />
        {/* Show order status */}
        <OrderStatus order={product} steps={steps} />
        <ReviewSection />
        <PriceSection order={order} />
        <UpdatesSection order={order} />
        <OrderIdSection order={order} />
      </div>
    </ContentWrapper>
  );
}
