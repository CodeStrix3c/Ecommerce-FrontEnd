import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useVendorProducts } from "@/hooks/Vendor/useVedorProducts";
import SearchBar from "@/components/shared/SearchBar";
import LoadingSpinner from "../components/loadingSpinner";
import { toast } from "react-toastify";
import ProductTable from "../components/productCard";
import Pagination from "../components/paginationComponent";
import Spinner from "@/components/ui/Spinner";
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
        Name: searchParams.query || "",
      },
    },
    sort: {
      predicate: sortBy || "",
      reverse: sortReverse,
    },
  });

  // 🔁 Fetch data
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
    <div className="w-full min-h-screen bg-[var(--color-background)] pt-[25%] lg:pt-[10%] pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <SearchBar onChange={setSearchParams} />
        </div>

        {isLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : products.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <ProductTable products={products} />

            <div className="flex justify-between items-center relative">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />

              {/* ➕ Open modal */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="absolute right-0 mt-5 h-10 w-10 rounded-full bg-black flex items-center justify-center cursor-pointer"
              >
                <span className="text-white text-lg font-bold">+</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllProductList;
