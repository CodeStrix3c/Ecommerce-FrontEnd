import React, { useState } from "react";
import { dummyData } from "@/data/dummyData";
import useIsMobile from "@/hooks/useInMobile";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartBottomBar from "../components/CartBottomBar";
import { useCartList } from "@/providers/CartListProvider";
import { Navigate } from "react-router-dom";
import EmptyState from "@/components/shared/EmptyState";
import { ShoppingCart } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

const CartPage = () => {
  const { cartList, removeFromCart, clearCart } = useCartList();

  const isMobile = useIsMobile();

  const checkoutAll = () => {
    alert("Proceeding to checkout with your cart!");
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
    <ContentWrapper variant="place">
      <div className="py-8 lg:mt-28 md:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={`col-span-2 flex flex-col gap-6 ${
            isMobile ? "pb-24" : "pb-0"
          }`}
        >
          <h1 className="text-2xl font-semibold text-[var(--color-neutral-dark)]">
            My Cart
          </h1>

          <div className="flex flex-col gap-4">
            {cartList.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        </div>

        {!isMobile && cartList.length > 0 && (
          <div className="col-span-1">
            <CartSummary
              cart={cartList}
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              onCheckout={checkoutAll}
              onClear={clearCart}
            />
          </div>
        )}

        {isMobile && cartList.length > 0 && (
          <CartBottomBar
            cart={cartList}
            total={total}
            onCheckout={checkoutAll}
          />
        )}
      </div>
    </ContentWrapper>
  );
};

export default CartPage;
