import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import useVendorProducts from "@/hooks/Vendor/useVedorProducts";
import SearchBar from "@/components/shared/SearchBar";
import LoadingSpinner from "../components/loadingSpinner";
import EmptyState from "../components/emptyState";
import { toast } from "react-toastify";
import ProductTable from "../components/productCard";
import Pagination from "../components/paginationComponent";

const AllProductList = () => {
  const PAGE_SIZE = 10;

  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortReverse, setSortReverse] = useState(true);

  const { mutate, data, isLoading } = useMutation({
    ...useVendorProducts(),
    onSuccess: (response) => {
      const count = response?.data?.items?.length || 0;
      // if (count > 0) toast.success(`Loaded ${count} products`);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load products",
      );
    },
  });

  const buildRequestBody = () => ({
    pagination: {
      start: (currentPage - 1) * PAGE_SIZE,
      number: PAGE_SIZE, // ✅ FIX
      totalItemCount: 0,
      numberOfPages: 0,
    },
    search: {
      predicateObject: {
        additionalProp1: [searchParams.query || ""],
        additionalProp2: [searchParams.category || ""],
        additionalProp3: [""],
      },
    },
    sort: {
      predicate: sortBy || "",
      reverse: sortReverse,
    },
  });

  useEffect(() => {
    mutate(buildRequestBody());
  }, [searchParams, currentPage, sortBy, sortReverse]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const products = data?.data?.items ?? [];
  const totalCount = data?.data?.totalRecord ?? 0;
  const totalPages = data?.data?.numberOfPages ?? 0;

  return (
    <div className="w-full min-h-screen bg-[var(--color-background)] pt-[25%] lg:pt-[10%] pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <SearchBar onChange={setSearchParams} />
        </div>

        {/* <div className="mb-6">
          <span className="font-medium text-black">
            {totalCount} products found
          </span>
        </div> */}

        {isLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : products.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <>
            <ProductTable products={products} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AllProductList;
