import React, { useState } from "react";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import WishlistItem from "../components/WishlistItem";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net/";

const WishlistPage = () => {
  const { addToCartList } = useCartList();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Track items that are being added to cart (for loading state)
  const [addingToCart, setAddingToCart] = useState(new Set());

  console.log(wishlist, "this is the wishlist data");

  const handleAddToCart = async (product, quantity) => {
    try {
      // Mark as adding to cart
      setAddingToCart((prev) => new Set([...prev, product.wishlistItemId]));

      // 🔥 Create the payload object
      const payload = {
        productId: product.productId,
        quantity: quantity,
        variationName: "",
      };

      console.log("Adding to cart with payload:", payload);

      // Call the API to add to cart
      await addToCartList(payload);

      // Show success toast
      toast.success("Product added to cart!")

      // Remove from wishlist after successfully adding to cart
      console.log("Removing from wishlist:", product.wishlistItemId);
      await removeFromWishlist(product.wishlistItemId);

      // Remove from adding state
      setAddingToCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.wishlistItemId);
        return newSet;
      });
    } catch (error) {
      console.error("Error adding to cart:", error);

      // Show error toast
      toast.error("Failed to add product to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Remove from adding state even on error
      setAddingToCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.wishlistItemId);
        return newSet;
      });
    }
  };

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Empty Wishlist"
        subTitle="Looks like you haven't added anything to your wishlist yet."
        btnText="Browse Products"
        redirectTo="/"
        type="wishlist"
        img={"/assets/images/empty-wishlist.png"}
      />
    );
  }

  return (
    <ContentWrapper compactScreen>
      <div className="py-10 lg:mt-24 md:mt-24">
        <div className="flex justify-between items-center mb-6">
          <SectionTitle title="My Wishlist" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <WishlistItem
              key={item.id}
              product={{
                wishlistItemId: item.id,
                productId: item.productId,
                title: item.productName,
                image: item.productImage?.startsWith("http")
                  ? item.productImage
                  : IMAGE_BASE_URL + item.productImage,
                price: item.price ?? 0,
                inStock: true,
                photos: [
                  item.productImage?.startsWith("http")
                    ? item.productImage
                    : IMAGE_BASE_URL + item.productImage,
                ],
              }}
              onRemove={removeFromWishlist}
              onAddToCart={handleAddToCart}
              isAddingToCart={addingToCart.has(item.id)}
            />
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default WishlistPage;
