import HelpButton from "../components/HelpButton";
import OrderIdSection from "../components/OrderIdSection";
import OrderStatus from "../components/OrderStatus";
import PriceSection from "../components/PriceSection";
import ProductCard from "../components/ProductCard";
import ReviewSection from "../components/ReviewSection";
import UpdatesSection from "../components/UpdatesSection";

export default function OrderDetailsPage() {
  const order = {
    id: "123923101239582105",
    brand: "Kraft",
    name: "Versatile Organic Potting Mix",
    size: "M",
    image: "/assets/images/dawa.jpg",
    status: "In Transit",
    statusDate: "Tue, 23 Jul 2024",
    price: 854,
    payment: "Pay on delivery",
    phone: "7006277781",
    email: "yameenansari04@gmail.com",
    seller: "Kraft Retail Private Limited",
    progress: 2,
  };

  const steps = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <div className=" md:pt-24 lg:pt-28 mb-3 lg:mx-48 min-h-screen bg-[var(--color-black-hover)]">
      <HelpButton />
      <ProductCard order={order} />
      <OrderStatus order={order} steps={steps} />
      <ReviewSection />
      <PriceSection order={order} />
      <UpdatesSection order={order} />
      <OrderIdSection order={order} />
    </div>
  );
}
