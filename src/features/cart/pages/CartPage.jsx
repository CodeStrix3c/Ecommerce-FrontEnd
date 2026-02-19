import React, { useState, useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import { useCartList } from "@/providers/CartListProvider";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartBottomBar from "../components/CartBottomBar";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartList, removeFromCart, clearCart, updateQuantity, isLoading } =
    useCartList();

  const isMobile = useIsMobile();
  const [selectedPayment, setSelectedPayment] = useState("");

  /* =========================
     USE BACKEND items ARRAY
  ========================== */

  const cartProducts = useMemo(() => {
    return Array.isArray(cartList) ? cartList : [];
  }, [cartList]);

  /* =========================
     CALCULATIONS
  ========================== */

  const { subtotal, taxes, total, totalItems } = useMemo(() => {
    const subtotalCalc = cartProducts.reduce(
      (sum, item) =>
        sum + Number(item.productPrice ?? 0) * Number(item.quantity ?? 1),
      0,
    );

    const itemCount = cartProducts.reduce(
      (count, item) => count + Number(item.quantity ?? 1),
      0,
    );

    const taxesCalc = subtotalCalc * 0.1;
    const totalCalc = subtotalCalc + taxesCalc;

    return {
      subtotal: subtotalCalc,
      taxes: taxesCalc,
      total: totalCalc,
      totalItems: itemCount,
    };
  }, [cartProducts]);

  /* =========================
     CHECKOUT
  ========================== */

  const checkoutAll = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method before checkout.");
      return;
    }

    toast.success(`Proceeding to checkout with ${selectedPayment}`);
  };

  /* =========================
     LOADING
  ========================== */

  if (isLoading) {
    return (
      <ContentWrapper compactScreen>
        <div className="py-16 sm:py-20 text-center text-base sm:text-lg font-medium">
          Loading cart...
        </div>
      </ContentWrapper>
    );
  }

  /* =========================
     EMPTY STATE
  ========================== */

  if (cartProducts.length === 0) {
    return (
      <EmptyState
        title="Empty Cart"
        subTitle="There is nothing in your cart. Let's add some items."
        btnText="Continue Shopping"
        redirectTo="/"
        type="cart"
      />
    );
  }

  /* =========================
     MAIN UI
  ========================== */

  return (
    <ContentWrapper compactScreen>
      <div
        className="
        py-6 sm:py-8 
        lg:mt-28 md:mt-28 
        grid grid-cols-1 lg:grid-cols-3 
        gap-6 sm:gap-8
      "
      >
        {/* LEFT SIDE */}
        <div
          className={`
          col-span-1 lg:col-span-2 
          flex flex-col 
          gap-4 sm:gap-6
          ${isMobile ? "pb-24" : ""}
        `}
        >
          {/* Responsive Header */}
          <div
            className="
            flex items-center 
            gap-3 
            flex-wrap
          "
          >
            {/* Icon */}
            <div
              className="
              bg-blue-100 
              p-2 
              sm:p-3 
              rounded-full 
              shadow-sm
            "
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>

            {/* Text */}
            <div>
              <h1
                className="
                text-lg sm:text-xl md:text-2xl 
                font-semibold 
                text-[var(--color-black)]
              "
              >
                My Cart
              </h1>

              <p className="text-xs sm:text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {cartProducts.map((product) => (
              <React.Fragment key={product.id}>
                <CartItem
                  product={{
                    cartItemId: product.id,
                    title: product.productName,
                    photos: product.productImage ? [product.productImage] : [],
                    price: Number(product.calculatedProductPrice?.price ?? 0),
                    oldPrice: Number(
                      product.calculatedProductPrice?.oldPrice ?? 0,
                    ),
                    savings: Number(
                      product.calculatedProductPrice?.percentOfSaving ?? 0,
                    ),
                    quantity: Number(product.quantity ?? 1),
                    rating: 0,
                    inStock: product.isProductAvailabeToOrder,
                  }}
                  onRemove={removeFromCart}
                  onQuantityChange={updateQuantity}
                />

                {isMobile && cartProducts.length > 1 && (
                  <hr className="border-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* DESKTOP SUMMARY */}
        {!isMobile && (
          <div className="col-span-1">
            <div className="sticky top-28">
              <CartSummary
                cart={cartProducts}
                subtotal={subtotal}
                taxes={taxes}
                total={total}
                onCheckout={checkoutAll}
                onClear={clearCart}
                selectedPayment={selectedPayment}
                onPaymentChange={setSelectedPayment}
              />
            </div>
          </div>
        )}

        {/* MOBILE BOTTOM BAR */}
        {isMobile && (
          <CartBottomBar
            cart={cartProducts}
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
