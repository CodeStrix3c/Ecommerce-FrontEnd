import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import WishlistItem from "../components/WishlistItem";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SectionTitle from "@/components/shared/SectionTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net/";

const WishlistPage = () => {
  const navigate = useNavigate();

  const { addToCartList } = useCartList();
  const { wishlist, removeFromWishlist } = useWishlist();

  const [addingToCart, setAddingToCart] = useState(new Set());

  // ✅ FIXED FUNCTION
  const handleAddToCart = async (product, quantity) => {
    try {
      setAddingToCart((prev) => new Set([...prev, product.wishlistItemId]));

      const payload = {
        productId: product.productId,
        quantity: quantity,
        variationName: "",
        packagingId: null, // ✅ IMPORTANT FIX (explicitly non-packaging)
      };

      await addToCartList(payload);

      // remove from wishlist WITHOUT toast
      await removeFromWishlist(product.wishlistItemId, { showToast: false });

      // navigate("/cart", { replace: true }); // optional
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.wishlistItemId);
        return newSet;
      });
    }
  };

  // Empty State
  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Empty Wishlist"
        subTitle="Looks like you haven't added anything to your wishlist yet."
        btnText="Browse Products"
        redirectTo="/"
        type="wishlist"
      />
    );
  }

  return (
    <ContentWrapper compactScreen>
      <div className="py-10 lg:mt-24 md:mt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--color-secondary)] p-2 rounded-full">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>

            <div>
              <SectionTitle title="My Wishlist" />
              <p className="text-sm text-gray-500">
                {wishlist.length} item{wishlist.length > 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const imageUrl = item.productImage?.startsWith("http")
              ? item.productImage
              : IMAGE_BASE_URL + item.productImage;

            return (
              <WishlistItem
                key={item.id}
                product={{
                  wishlistItemId: item.id,
                  productId: item.productId,
                  title: item.productName,
                  image: imageUrl,
                  price: item.price ?? 0,
                  inStock: item.quantity > 0,
                  photos: [imageUrl],
                }}
                onRemove={removeFromWishlist}
                onAddToCart={handleAddToCart}
                isAddingToCart={addingToCart.has(item.id)}
              />
            );
          })}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default WishlistPage;
