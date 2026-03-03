import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  useVendorProducts,
  useRemoveVendorProduct,
} from "@/hooks/Vendor/useVedorProducts";
import LoadingSpinner from "../components/loadingSpinner";
import { toast } from "react-toastify";
import ProductTable from "../components/productCard";
import Pagination from "../components/paginationComponent";
import ProductModal from "@/modals/vendorProductModal";
import AssignProductModal from "@/modals/AssignProductModal";
import ConfirmDialog from "@/components/shared/confirmDialog";
import ProductSearchBar from "@/components/shared/productSearchBar";

const AllProductList = () => {
  const PAGE_SIZE = 10;

  const vendorId = useMemo(() => localStorage.getItem("vendorId"), []);

  const [searchParams, setSearchParams] = useState({ query: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState("");
  const [sortReverse, setSortReverse] = useState(false);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Prevent duplicate fetches
  const isFetchingRef = useRef(false);
  const hasInitialFetchRef = useRef(false);

  const {
    mutate: fetchProducts,
    data,
    isLoading,
  } = useMutation({
    ...useVendorProducts(),
    onError: (error) => {
      console.error("Failed to load products:", error);
      toast.error("Failed to load products");
      isFetchingRef.current = false;
    },
    onSuccess: () => {
      isFetchingRef.current = false;
    },
    onSettled: () => {
      setIsInitialLoad(false);
    },
  });

  const { mutate: deleteProduct, isLoading: deleting } = useMutation({
    ...useRemoveVendorProduct(),
    onSuccess: () => {
      toast.success("Product removed successfully");
      setConfirmOpen(false);
      setDeleteProductId(null);
      fetchProducts(buildRequestBody());
    },
    onError: (error) => {
      console.error("Failed to remove product:", error);
      toast.error("Failed to remove product");
    },
  });

  const buildRequestBody = useCallback(
    () => ({
      pagination: {
        start: (currentPage - 1) * PAGE_SIZE,
        number: PAGE_SIZE,
      },
      search: {
        predicateObject: {
          Name: searchParams.query || null,
        },
      },
      sort: {
        predicate: sortBy || null,
        reverse: sortReverse,
      },
    }),
    [currentPage, searchParams.query, sortBy, sortReverse]
  );

  // Stable fetch function that prevents duplicate calls
  const safeFetchProducts = useCallback(() => {
    if (!vendorId) {
      toast.error("Vendor not found");
      return;
    }

    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    fetchProducts(buildRequestBody());
  }, [vendorId, buildRequestBody, fetchProducts]);

  // Initial fetch only
  useEffect(() => {
    if (!hasInitialFetchRef.current) {
      hasInitialFetchRef.current = true;
      safeFetchProducts();
    }
  }, [safeFetchProducts]);

  // Fetch when dependencies change (but not on initial mount)
  useEffect(() => {
    if (hasInitialFetchRef.current) {
      safeFetchProducts();
    }
  }, [currentPage, searchParams.query, sortBy, sortReverse]);

  const products = useMemo(() => data?.data?.items ?? [], [data]);
  const totalPages = useMemo(() => data?.data?.numberOfPages ?? 0, [data]);

  const handleDeleteProduct = useCallback((productId) => {
    setDeleteProductId(productId);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!vendorId || !deleteProductId) return;
    deleteProduct({ vendorId, productId: deleteProductId });
  }, [vendorId, deleteProductId, deleteProduct]);

  const handleEditProduct = useCallback((product) => {
    setEditProduct(product);
    setAssignModalOpen(true);
  }, []);

  const handleProductSelect = useCallback((productId) => {
    setSelectedProductId(productId);
    setProductModalOpen(false);
    setAssignModalOpen(true);
  }, []);

  const handleAssignSuccess = useCallback(() => {
    const isUpdate = !!editProduct;
    toast.success(isUpdate ? "Product updated successfully" : "Product assigned successfully");
    setAssignModalOpen(false);
    setEditProduct(null);
    setSelectedProductId(null);
    safeFetchProducts();
  }, [editProduct, safeFetchProducts]);

  const handleSearch = useCallback((query) => {
    setSearchParams({ query });
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback(
    (column) => {
      if (sortBy === column) {
        setSortReverse((prev) => !prev);
      } else {
        setSortBy(column);
        setSortReverse(false);
      }
      setCurrentPage(1);
    },
    [sortBy]
  );

  const handleCloseAssignModal = useCallback(() => {
    setAssignModalOpen(false);
    setEditProduct(null);
    setSelectedProductId(null);
  }, []);

  const handleCancelConfirm = useCallback(() => {
    setConfirmOpen(false);
    setDeleteProductId(null);
  }, []);

  const assignedProductIds = useMemo(
    () => products.map((p) => p.productId),
    [products]
  );

  // Early return if vendor not found
  if (!vendorId) {
    return (
      <div className="mt-4 w-full bg-[var(--color-background)] pt-4 sm:pt-6 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-red-600 mt-20">
            Vendor not found. Please log in again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full bg-[var(--color-background)] pt-4 sm:pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="mb-4 flex justify-center sm:justify-start lg:-mt-1">
          <div className="w-full sm:w-[320px] md:w-[380px]">
            <ProductSearchBar
              placeholder="Search products..."
              onSearch={handleSearch}
            />
          </div>
        </div>

        {isInitialLoad || (isLoading && !data) ? (
          <LoadingSpinner message="Loading products..." />
        ) : products.length === 0 ? (
          <div className="text-center text-[var(--color-black)] mt-20">
            {searchParams.query
              ? "No products found matching your search"
              : "No products available"}
          </div>
        ) : (
          <>
            <ProductTable
              products={products}
              sortBy={sortBy}
              sortReverse={sortReverse}
              onSort={handleSort}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}

        <button
          onClick={() => setProductModalOpen(true)}
          className="fixed bottom-20 sm:bottom-8 right-6 z-50 h-12 w-12 rounded-full bg-[var(--color-secondary)] flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
          aria-label="Add new product"
          type="button"
        >
          <span className="text-[var(--color-white)] text-2xl font-bold leading-none">
            +
          </span>
        </button>

        <ProductModal
          isOpen={productModalOpen}
          onClose={() => setProductModalOpen(false)}
          onSelectProduct={handleProductSelect}
          assignedProductIds={assignedProductIds}
        />

        <AssignProductModal
          isOpen={assignModalOpen}
          onClose={handleCloseAssignModal}
          vendorId={vendorId}
          productId={editProduct?.productId ?? selectedProductId}
          assignmentId={editProduct?.id}
          mode={editProduct ? "update" : "assign"}
          initialData={editProduct}
          onSuccess={handleAssignSuccess}
        />

        <ConfirmDialog
          isOpen={confirmOpen}
          title="Delete Product"
          message="Are you sure you want to remove this product?"
          confirmText="Delete"
          onConfirm={confirmDelete}
          onCancel={handleCancelConfirm}
          loading={deleting}
        />
      </div>
    </div>
    
  );
};

export default AllProductList;