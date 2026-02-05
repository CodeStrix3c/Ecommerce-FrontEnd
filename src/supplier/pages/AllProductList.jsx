import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import VendorSearchBar from "@/components/shared/VendorSearchBar";

const AllProductList = () => {
  const PAGE_SIZE = 10;

  /* ✅ vendorId */
  const vendorId = useMemo(() => localStorage.getItem("vendorId"), []);

  const [searchParams, setSearchParams] = useState({ query: "" });
  const [currentPage, setCurrentPage] = useState(1);

  /* ✅ SORT STATE (only addition) */
  const [sortBy, setSortBy] = useState("");
  const [sortReverse, setSortReverse] = useState(false);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const {
    mutate: fetchProducts,
    data,
    isLoading,
  } = useMutation({
    ...useVendorProducts(),
    onError: () => toast.error("Failed to load products"),
  });

  /* ---------------- DELETE PRODUCT ---------------- */
  const { mutate: deleteProduct, isLoading: deleting } = useMutation({
    ...useRemoveVendorProduct(),
    onSuccess: () => {
      toast.success("Product removed successfully");
      setConfirmOpen(false);
      setDeleteProductId(null);
      fetchProducts(buildRequestBody());
    },
    onError: () => toast.error("Failed to remove product"),
  });

  /* ---------------- REQUEST BODY ---------------- */
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
        predicate: sortBy,
        reverse: sortReverse,
      },
    }),
    [currentPage, searchParams, sortBy, sortReverse],
  );

  /* ---------------- SINGLE API TRIGGER ---------------- */
  useEffect(() => {
    if (!vendorId) {
      toast.error("Vendor not found");
      return;
    }

    fetchProducts(buildRequestBody());
  }, [vendorId, buildRequestBody, fetchProducts]);

  const products = data?.data?.items ?? [];
  const totalPages = data?.data?.numberOfPages ?? 0;

  /* ---------------- DELETE HANDLER ---------------- */
  const handleDeleteProduct = (productId) => {
    if (!vendorId) {
      toast.error("Vendor not found");
      return;
    }

    setDeleteProductId(productId);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct({
      vendorId,
      productId: deleteProductId,
    });
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setAssignModalOpen(true);
  };

  /* ---------------- PRODUCT ASSIGN FLOW ---------------- */
  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    setProductModalOpen(false);
    setAssignModalOpen(true);
  };

  const handleAssignSuccess = () => {
    toast.success("Product assigned successfully");
    setAssignModalOpen(false);
    fetchProducts(buildRequestBody());
  };

  return (
    <div className="w-full  bg-[var(--color-background)] pt-2 sm:pt-20 pb-5">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* ===== TOP CONTROLS ===== */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <SearchBar onChange={setSearchParams} />

          <div className="flex items-center gap-3">
            {/* <ViewToggle /> */}

        <div className="mt-4 mb-6 flex justify-end">
          <div className="w-56 sm:w-60">
            <VendorSearchBar onChange={setSearchParams} />
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        {isLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No products available
          </div>
        ) : (
          <>
            <ProductTable
              products={products}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
            />

            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

        {/* ➕ ADD PRODUCT */}
        <div
          onClick={() => setProductModalOpen(true)}
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-black
          flex items-center justify-center cursor-pointer shadow-lg"
        >
          <span className="text-white text-2xl font-bold">+</span>
        </div>

        <ProductModal
          isOpen={productModalOpen}
          onClose={() => setProductModalOpen(false)}
          onSelectProduct={handleProductSelect}
        />

        <AssignProductModal
          isOpen={assignModalOpen}
          onClose={() => {
            setAssignModalOpen(false);
            setEditProduct(null);
            setSelectedProductId(null);
          }}
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
          onCancel={() => setConfirmOpen(false)}
          loading={deleting}
        />
      </div>
    </div>
  );
};

export default AllProductList;
