import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import { useCartList } from "@/providers/CartListProvider";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartBottomBar from "../components/CartBottomBar";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";

const CartPage = () => {
  const { cartList, removeFromCart, clearCart } = useCartList();
  const isMobile = useIsMobile();

  const [selectedPayment, setSelectedPayment] = useState("");

  const checkoutAll = () => {
    if (!selectedPayment) {
      alert("Please select a payment method before checkout.");
      return;
    }
    alert(`Proceeding to checkout with ${selectedPayment}`);
  };

  const subtotal = cartList.reduce((sum, item) => sum + item.price, 0);
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  if (cartList.length === 0) {
    return (
      <EmptyState
        title="Empty Cart"
        subTitle="Your cart is empty. Add items you love and come back to checkout!"
        icon={
          <ShoppingCart className="w-16 h-16 text-[var(--color-secondary)]" />
        }
        btnText="Continue Shopping"
        redirectTo="/"
      />
    );
  }

  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-28 md:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={`col-span-2 flex flex-col gap-6 ${isMobile ? "pb-24" : "pb-0"}`}
        >
          <h1 className="text-2xl font-semibold text-[var(--color-neutral-dark)]">
            My Cart
          </h1>

          <div className="flex flex-col gap-6">
            {cartList.map((product) => (
              <>
                <CartItem
                  key={product._id}
                  product={product}
                  onRemove={removeFromCart}
                />
                {isMobile && cartList.length > 1 && <hr />}
              </>
            ))}
          </div>
        </div>

        {!isMobile && cartList.length > 0 && (
          <div className="col-span-1 mt-14">
            <CartSummary
              cart={cartList}
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              onCheckout={checkoutAll}
              onClear={clearCart}
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
            />
          </div>
        )}

        {isMobile && cartList.length > 0 && (
          <CartBottomBar
            cart={cartList}
            total={total}
            onCheckout={checkoutAll}
            selectedPayment={selectedPayment}
            onPaymentChange={setSelectedPayment}
          />
        )}
      </div>
    </ContentWrapper>
  );
};

export default CartPage;
