import React, { useState } from "react";
import { dummyData } from "@/data/dummyData";
import useIsMobile from "@/hooks/useInMobile";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartBottomBar from "../components/CartBottomBar";
import { useCartList } from "@/providers/CartListProvider";

const CartPage = () => {
  const {cartList} =useCartList();
  const [cart, setCart] = useState(cartList);
  
  const isMobile = useIsMobile();

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item._id !== id));

  const clearCart = () => setCart([]);

  const checkoutAll = () => {
    alert("Proceeding to checkout with your cart!");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  return (
    <div className="py-8 lg:mt-28 md:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        className={`col-span-2 flex flex-col gap-6 ${
          isMobile ? "pb-24" : "pb-0"
        }`}
      >
        <h1 className="text-2xl font-semibold text-[var(--color-neutral-dark)]">
          My Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-[var(--color-neutral-dark)]">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Summary */}
      {!isMobile && cart.length > 0 && (
        <div className="col-span-1">
          <CartSummary
            cart={cart}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
            onCheckout={checkoutAll}
            onClear={clearCart}
          />
        </div>
      )}

      {/* Mobile Bottom Bar */}
      {isMobile && cart.length > 0 && (
        <CartBottomBar cart={cart} total={total} onCheckout={checkoutAll} />
      )}
    </div>
  );
};

export default CartPage;
