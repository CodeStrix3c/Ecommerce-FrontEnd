import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useVendorProducts } from "@/hooks/Vendor/useVedorProducts";
import SearchBar from "@/components/shared/SearchBar";
import LoadingSpinner from "../components/loadingSpinner";
import { toast } from "react-toastify";
import ProductTable from "../components/productCard";
import Pagination from "../components/paginationComponent";
import ProductModal from "@/modals/vendorProductModal";

const AllProductList = () => {
  const PAGE_SIZE = 10;

  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortReverse, setSortReverse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, data, isLoading } = useMutation({
    ...useVendorProducts(),
    onSuccess: (response) => {
      const count = response?.data?.items?.length || 0;
      // toast.success(`Loaded ${count} products`);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load products",
      );
    },
  });

  // 🔑 Build request body
  const buildRequestBody = () => ({
    pagination: {
      start: (currentPage - 1) * PAGE_SIZE,
      number: PAGE_SIZE,
      totalItemCount: 0,
      numberOfPages: 0,
    },
    search: {
      predicateObject: {
        Name: searchParams.query || null,
      },
    },
    sort: {
      predicate: sortBy || "",
      reverse: sortReverse,
    },
  });

  // 🔁 Fetch products
  useEffect(() => {
    mutate(buildRequestBody());
  }, [searchParams, currentPage, sortBy, sortReverse]);

  // 🔄 Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const products = data?.data?.items ?? [];
  const totalPages = data?.data?.numberOfPages ?? 0;

  return (
    <div className="w-full min-h-screen bg-[var(--color-background)] pt-[25%] lg:pt-[10%] pb-20">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* 🔍 Search */}
        <div className="mb-8 flex justify-center">
          <SearchBar onChange={setSearchParams} />
        </div>

        {/* 📦 Content */}
        {isLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : (
          <>
            {products.length === 0 ? (
              <p className="text-center text-gray-500 mt-20">
                No products available
              </p>
            ) : (
              <>
                <ProductTable products={products} />

                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* ➕ Floating Add Product Button (ALWAYS VISIBLE) */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full
          bg-black flex items-center justify-center cursor-pointer
          shadow-lg hover:scale-105 transition-transform"
        >
          <span className="text-white text-2xl font-bold">+</span>
        </div>

        {/* 🪟 Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default AllProductList;
