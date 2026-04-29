import React, { useState } from "react";
import { Heart, IndianRupee, ShieldCheck, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import StarRating from "@/components/ui/StarRating";
import PlaceCardSkeletonUi from "@/features/places/components/PlaceCardSkeletonUi";
import { useWishlist } from "@/providers/WishListProvider";

const formatINR = (value) => Number(value).toLocaleString("en-IN");

const VendorCard = ({ product, loading }) => {
    const { wishlist, toggleWishlist } = useWishlist();
    const [isToggling, setIsToggling] = useState(false);

    if (loading || !product) {
        return <PlaceCardSkeletonUi />;
    }

    const {
        id,
        title,
        category,
        image,
        price,
        oldPrice,
        rating,
        ratingCount,
        stock,
        vendorName,
        isVerifiedVendor,
    } = product;

    const isOutOfStock = stock === 0;
    const isWishlisted = wishlist.some((item) => item.productId === id);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isToggling) return;

        setIsToggling(true);
        try {
            await toggleWishlist(product);
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <Link to={`/place/${id}`} className="block h-full">
            <article className="group h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* IMAGE */}
                <div className="relative overflow-hidden bg-gray-100">
                    <div className="aspect-[4/3] overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? "grayscale-[0.35]" : ""
                                }`}
                        />
                    </div>

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* BADGES */}
                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                        {isVerifiedVendor && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
                                <ShieldCheck size={11} />
                                Verified
                            </span>
                        )}

                        {isOutOfStock && (
                            <span className="rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white shadow-sm">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    {/* WISHLIST */}
                    <button
                        onClick={handleWishlistToggle}
                        disabled={isToggling}
                        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition-all hover:bg-white active:scale-95 disabled:cursor-not-allowed"
                        aria-label="Toggle Wishlist"
                    >
                        <Heart
                            className={`h-5 w-5 transition-colors ${isWishlisted
                                ? "fill-red-500 stroke-red-500"
                                : "stroke-gray-700"
                                }`}
                        />
                    </button>

                    {/* HOVER CTA */}
                    <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg backdrop-blur-sm">
                            <Eye size={15} />
                            View Product
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                    {/* CATEGORY */}
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                        {category || "Product"}
                    </p>

                    {/* TITLE */}
                    <h3 className="mt-1 line-clamp-2 min-h-[44px] text-sm font-semibold leading-5 text-gray-900">
                        {title}
                    </h3>

                    {/* VENDOR */}
                    <p className="mt-1 text-sm text-gray-500">
                        by <span className="font-medium text-gray-700">{vendorName}</span>
                    </p>

                    {/* RATING */}
                    <div className="mt-3 h-5">
                        {rating ? (
                            <StarRating size={14} rating={rating} count={ratingCount} />
                        ) : (
                            <span className="text-xs text-gray-400">No reviews yet</span>
                        )}
                    </div>

                    {/* PRICE + STOCK */}
                    <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-end gap-2">
                            <span className="flex items-center text-lg font-semibold text-gray-900">
                                <IndianRupee className="h-4 w-4" />
                                {formatINR(price)}
                            </span>

                            {oldPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{formatINR(oldPrice)}
                                </span>
                            )}
                        </div>

                        <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${isOutOfStock
                                ? "bg-red-50 text-red-600"
                                : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {isOutOfStock ? "Unavailable" : `${stock} in stock`}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default VendorCard;