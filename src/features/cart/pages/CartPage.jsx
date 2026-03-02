import React, { useState, useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import { useCartList } from "@/providers/CartListProvider";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartBottomBar from "../components/CartBottomBar";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    cartList,
    subTotal,
    discount,
    subTotalWithDiscount,
    removeFromCart,
    clearCart,
    updateQuantity,
    isLoading,
  } = useCartList();

  const isMobile = useIsMobile();
  const [selectedPayment, setSelectedPayment] = useState("");



  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCartItemId, setSelectedCartItemId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);



  const cartProducts = useMemo(() => {
    return Array.isArray(cartList) ? cartList : [];
  }, [cartList]);



  const totalItems = useMemo(() => {
    return cartProducts.reduce(
      (count, item) => count + Number(item.quantity ?? 1),
      0,
    );
  }, [cartProducts]);



  const handleRemoveClick = (cartItemId) => {
    setSelectedCartItemId(cartItemId);
    setConfirmOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (!selectedCartItemId) return;

    try {
      setConfirmLoading(true);
      await removeFromCart(selectedCartItemId);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
      setSelectedCartItemId(null);
    }
  };



  const checkoutAll = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method before checkout.");
      return;
    }

    toast.success(`Proceeding to checkout with ${selectedPayment}`);
  };


  if (isLoading) {
    return (
      <ContentWrapper compactScreen>
        <div className="py-16 text-center text-base font-medium">
          Loading cart...
        </div>
      </ContentWrapper>
    );
  }



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

  return (
    <>
      <ContentWrapper compactScreen>
        <div className="py-6 lg:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div
            className={`col-span-1 lg:col-span-2 flex flex-col gap-6 ${isMobile ? "pb-24" : ""
              }`}
          >

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full shadow-sm">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <h1 className="text-xl font-semibold">My Cart</h1>
                <p className="text-sm text-gray-500">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>


            <div className="flex flex-col gap-6">
              {cartProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <CartItem
                    product={{
                      cartItemId: product.id,
                      title: product.productName,
                      photos: product.productImage
                        ? [product.productImage]
                        : [],
                      price: Number(
                        product.calculatedProductPrice?.price ?? 0,
                      ),
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
                    onRemove={handleRemoveClick}
                    onQuantityChange={updateQuantity}
                  />

                  {isMobile && cartProducts.length > 1 && (
                    <hr className="border-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>


          {!isMobile && (
            <div className="col-span-1">
              <div className="sticky top-28">
                <CartSummary
                  cart={cartProducts}
                  subTotal={subTotal}
                  discount={discount}
                  total={subTotalWithDiscount}
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
              total={subTotalWithDiscount}
              onCheckout={checkoutAll}
              onPaymentChange={setSelectedPayment}
            />
          )}
        </div>
      </ContentWrapper>


      <ConfirmDialog
        isOpen={confirmOpen}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleConfirmRemove}
        onCancel={() => {
          if (!confirmLoading) {
            setConfirmOpen(false);
            setSelectedCartItemId(null);
          }
        }}
        loading={confirmLoading}
        variant="danger"
      />
    </>
  );
};

export default CartPage;