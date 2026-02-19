import React, { useState, useMemo } from "react";
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

  console.log(cartList, "this list is from cart ");
  /* =========================
     CALCULATIONS
  ========================== */

  const { subtotal, taxes, total, totalItems } = useMemo(() => {
    const subtotalCalc = cartProducts.reduce((sum, item) => {
      return sum + Number(item.productPrice ?? 0) * Number(item.quantity ?? 1);
    }, 0);

    const itemCount = cartProducts.reduce((count, item) => {
      return count + Number(item.quantity ?? 1);
    }, 0);

    const taxesCalc = subtotalCalc * 0.1;
    const totalCalc = subtotalCalc + taxesCalc;

    return {
      subtotal: subtotalCalc,
      taxes: taxesCalc,
      total: totalCalc,
      totalItems: itemCount,
    };
  }, [cartProducts]);

  const checkoutAll = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method before checkout.");
      return;
    }

    toast.success(`Proceeding to checkout with ${selectedPayment}`);
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading cart...</div>;
  }

  if (cartProducts.length === 0) {
    return (
      <EmptyState
        title="Empty Cart"
        subTitle="There is nothing in your cart. Let's add some items"
        img="/assets/images/empty-cart.png"
        btnText="Continue Shopping"
        redirectTo="/"
      />
    );
  }

  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-28 md:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div
          className={`col-span-2 flex flex-col gap-6 ${isMobile ? "pb-24" : ""}`}
        >
          <h1 className="text-2xl font-semibold text-[var(--color-black)]">
            My Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>

          <div className="flex flex-col gap-6">
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
                  onRemove={(cartItemId) => removeFromCart(cartItemId)}
                  onQuantityChange={(cartItemId, qty) =>
                    updateQuantity(cartItemId, qty)
                  }
                />

                {isMobile && cartProducts.length > 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* DESKTOP SUMMARY */}
        {!isMobile && (
          <div className="col-span-1 mt-14">
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
        )}

        {/* MOBILE BAR */}
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
