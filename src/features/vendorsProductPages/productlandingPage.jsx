import { useState, useEffect, useRef, useMemo } from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SearchBar from "@/components/shared/SearchBar";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useWishlist } from "@/providers/WishListProvider";
import {
    ChevronDown,
    Loader2,
    ShieldCheck,
    Store,
    Package,
    BadgeCheck,
    ArrowRight,
} from "lucide-react";
import ProductSkeleton from "@/components/ui/ProductSkelton";
import VendorCard from "./components/VendorCard";
import VendorSidebar from "./components/VendorSidebar";

const ProductLandingPage = () => {
    const [searchParams, setSearchParams] = useState({ query: "", category: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const observerTarget = useRef(null);
    const loadingRef = useRef(false);

    const { data, isLoading } = useProductsQuery({
        query: searchParams.query,
        category: searchParams.category,
        sort: sortBy,
        page: currentPage,
    });

    const { toggleWishlist } = useWishlist();

    const vendor = {
        vendorName: "Gulam Mohammad Kani",
        occupation: "Traditional Kashmiri Artisan",
        address: "Zaina Kadal, Srinagar, Jammu & Kashmir, India",
        phone: "+91 98765 43210",
        email: "kaniweaves@gmail.com",
        image: "/assets/images/vendor-profile.jpg",
        description:
            "Specialized in authentic handmade Kashmiri crafts with a focus on traditional artistry, heritage detailing, and artisan-made cultural products.",
        totalProducts: 57,
        vendorSince: "2018",
    };

    const products = useMemo(() => {
        return (data?.products || []).map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.name,
            category: item.category?.name ?? null,
            price: item.price,
            oldPrice: item.oldPrice,
            rating: item.ratingAverage ?? null,
            ratingCount: item.reviewsCount ?? 0,
            stock: item.stockQuantity ?? 0,
            image: item.thumbnailUrl,
            discountPercent: item.calculatedProductPrice?.percentOfSaving ?? null,
        }));
    }, [data?.products]);

    const totalPages = Math.ceil(
        (data?.totalProduct ?? 0) / (data?.currentSearchOption?.pageSize ?? 10),
    );

    useEffect(() => {
        setAllProducts([]);
        setCurrentPage(1);
        setHasMore(true);
        loadingRef.current = false;
        setIsLoadingMore(false);
    }, [searchParams.query, searchParams.category, sortBy]);

    useEffect(() => {
        if (data?.products && products.length > 0) {
            setAllProducts((prev) => {
                if (currentPage === 1) {
                    loadingRef.current = false;
                    setIsLoadingMore(false);
                    return products;
                }

                const existingIds = new Set(prev.map((p) => p.id));
                const newProducts = products.filter((p) => !existingIds.has(p.id));

                loadingRef.current = false;
                setIsLoadingMore(false);

                return [...prev, ...newProducts];
            });

            setHasMore(currentPage < totalPages);
        } else if (data?.products && products.length === 0 && currentPage > 1) {
            setHasMore(false);
            loadingRef.current = false;
            setIsLoadingMore(false);
        }
    }, [data?.products, currentPage, totalPages, products]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !loadingRef.current &&
                    !isLoading &&
                    allProducts.length > 0
                ) {
                    loadingRef.current = true;
                    setIsLoadingMore(true);
                    setCurrentPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1, rootMargin: "200px" },
        );

        const currentTarget = observerTarget.current;

        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [hasMore, isLoading, allProducts.length]);

    return (
        <ContentWrapper>
            <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 mt-10 items-start">
                <VendorSidebar vendor={vendor} />

                <div>

                    <section className="mt-0">
                        <div className="relative overflow-hidden rounded-[32px] border bg-[var(--color-white)]">
                            <div className="absolute inset-0">
                                <img
                                    src="/assets/images/vendorbanner.jpg"
                                    alt="Handicraft Vendor"
                                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" /> */}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
                                {/* LEFT */}
                                <div className="px-6 py-8 md:px-8 md:py-10 xl:px-10 xl:py-12 text-[var(--color-white)]">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[var(--color-white)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-black)] shadow-sm backdrop-blur-md">
                                        <ShieldCheck size={14} className="text-[var(--color-secondary)]" />
                                        Authentic Handicraft Marketplace
                                    </div>

                                    <div className="mt-6 max-w-2xl">
                                        <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold tracking-tight leading-[1.05] text-[var(--color-white)]">
                                            Discover timeless handcrafted treasures
                                            <span className="mt-1 block text-[var(--color-white)]">
                                                from skilled artisans & trusted local vendors
                                            </span>
                                        </h1>

                                        <p className="mt-5 max-w-xl text-sm md:text-base leading-7 text-white/85">
                                            Explore curated handmade collections crafted by expert artisans.
                                            From heritage décor to cultural essentials, source authentic
                                            handcrafted products directly from trusted vendors preserving
                                            traditional craftsmanship.
                                        </p>
                                    </div>

                                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                                        <div className="rounded-2xl border border-white/20 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                            <div className="flex items-start gap-2 text-sm font-medium text-[var(--color-black)] leading-tight">
                                                <BadgeCheck
                                                    size={20}
                                                    className="mt-0.5 shrink-0 text-[var(--color-secondary)]"
                                                />
                                                <span>Artisan Verified</span>
                                            </div>
                                            <p className="mt-1 text-xs text-center leading-5 text-[var(--color-black)]">
                                                Trusted handmade sellers
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-white/20 bg-[var(--color-white)] px-4 py-4 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                            <div className="flex items-start gap-2 text-sm font-medium text-[var(--color-black)] leading-tight">
                                                <Package
                                                    size={20}
                                                    className="mt-0.5 shrink-0 text-[var(--color-secondary)]"
                                                />
                                                <span>Handmade Collection</span>
                                            </div>
                                            <p className="mt-1 text-xs text-center leading-5 text-[var(--color-black)]">
                                                Curated artisan products
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-white/20 bg-[var(--color-white)] px-4 py-4 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                            <div className="flex items-start gap-2 text-sm font-medium text-[var(--color-black)] leading-tight">
                                                <Store
                                                    size={20}
                                                    className="mt-0.5 shrink-0 text-[var(--color-secondary)]"
                                                />
                                                <span>Cultural Craft</span>
                                            </div>
                                            <p className="mt-1 text-xs text-center leading-5 text-[var(--color-black)]">
                                                Heritage-inspired sourcing
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="px-6 py-8 md:px-8 md:py-10 xl:px-10 xl:py-12">
                                    <div className="flex h-full flex-col justify-between">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-3xl border border-white/70 bg-[var(--color-white)] p-5 shadow-lg backdrop-blur-md">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-black)]">
                                                    Collection
                                                </p>
                                                <h3 className="mt-3 text-3xl font-semibold text-[var(--color-error)]">
                                                    {data?.totalProduct ?? 0}
                                                </h3>
                                                <p className="mt-1 text-xs text-[var(--color-black)]">
                                                    Crafted products
                                                </p>
                                            </div>

                                            <div className="rounded-3xl border border-white/70 bg-[var(--color-white)] p-5 shadow-lg backdrop-blur-md">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-black)]">
                                                    Authentic
                                                </p>
                                                <h3 className="mt-3 text-3xl font-semibold text-[var(--color-primary)]">
                                                    100%
                                                </h3>
                                                <p className="mt-1 text-xs text-[var(--color-black)]">
                                                    Handmade verified
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 rounded-3xl border border-white/70 bg-[var(--color-white)] p-6 shadow-xl backdrop-blur-md">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-black)]">
                                                Artisan Network
                                            </p>

                                            <h4 className="mt-2 text-xl font-semibold leading-tight text-[var(--color-black)]">
                                                Crafted for heritage sourcing
                                            </h4>

                                            <p className="mt-3 text-sm leading-7 text-[var(--color-black)]">
                                                Connect with authentic handicraft vendors, explore
                                                handmade excellence, and source artisan products with
                                                confidence from trusted cultural creators.
                                            </p>

                                            <div className="mt-5 items-center gap-3">
                                                <button className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-secondary)] px-5 py-3 text-sm font-medium text-[var(--color-white)] transition hover:translate-x-1">
                                                    Explore Handicrafts
                                                    <ArrowRight size={20} className="text-[var(--color-white)] font-semibold" />
                                                </button>

                                                {/* <span className="text-xs font-medium text-[var(--color-black)]">
                                                   Curated • Trusted • Handmade
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                    {/* SORT + SEARCH — desktop */}
                    <div className="relative flex flex-col md:flex-row md:items-center py-4 mt-14">
                        {/* SEARCH (always centered) */}
                        <div className="w-full flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                            <div className="w-full max-w-xl">
                                <SearchBar
                                    onChange={setSearchParams}
                                    showCategory
                                    className="border border-white/10 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* SORT (right side) */}
                        <div className="w-full md:w-auto md:ml-auto mt-4 md:mt-0 flex justify-end">
                            <div className="relative inline-block w-full md:w-auto text-left">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full md:w-auto appearance-none bg-[var(--color-white)] border border-gray-200 rounded-full px-6 py-2.5 pr-10 text-xs font-bold uppercase tracking-wider text-gray-700 outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer shadow-sm"
                                >
                                    <option value="">Sort By: Price</option>
                                    <option value="price-asc">Sort By: Low to High</option>
                                    <option value="price-desc">Sort By: High to Low</option>
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <ChevronDown size={14} className="text-[var(--color-secondary)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCTS */}
                    <section className="mt-12 pt-2 pb-4">
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-black)]">
                                Vendor Catalogue
                            </p>
                            <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-black)]">
                                Featured Vendor Products
                            </h2>
                            <p className="mt-1 text-sm text-[var(--color-black)]">
                                Browse curated listings from trusted suppliers and verified vendors
                            </p>
                        </div>

                        <main>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {isLoading && currentPage === 1
                                    ? Array.from({ length: 8 }).map((_, i) => (
                                        <ProductSkeleton key={i} />
                                    ))
                                    : allProducts.length > 0
                                        ? allProducts.map((product) => (
                                            <VendorCard
                                                key={product.id}
                                                product={product}
                                                onToggleWishlist={() => toggleWishlist(product)}
                                            />
                                        ))
                                        : !isLoading && (
                                            <div className="col-span-full py-20 text-center text-[var(--color-black)] text-sm font-medium">
                                                No products found...
                                            </div>
                                        )}
                            </div>

                            {isLoadingMore && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <ProductSkeleton key={i} />
                                    ))}
                                </div>
                            )}

                            {hasMore && allProducts.length > 0 && !isLoadingMore && (
                                <div ref={observerTarget} className="h-20 flex justify-center items-center" />
                            )}

                            {isLoadingMore && (
                                <div className="flex justify-center items-center py-8">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-black)]" />
                                        <p className="text-sm text-[var(--color-black)] font-medium">
                                            Loading more products...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!hasMore && allProducts.length > 0 && (
                                <div className="flex justify-center items-center py-12">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-0.5 bg-gray-200 rounded-full" />
                                        <p className="text-sm text-[var(--color-black)] font-medium">
                                            You've reached the end
                                        </p>
                                    </div>
                                </div>
                            )}
                        </main>
                    </section>
                </div>
            </div>
        </ContentWrapper>
    );
};

export default ProductLandingPage;