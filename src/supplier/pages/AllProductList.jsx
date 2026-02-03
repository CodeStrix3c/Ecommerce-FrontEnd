import React, { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  useVendorProducts,
  useRemoveVendorProduct,
} from "@/hooks/Vendor/useVedorProducts";
import SearchBar from "@/components/shared/SearchBar";
import LoadingSpinner from "../components/loadingSpinner";
import { toast } from "react-toastify";
import ProductTable from "../components/productCard";
import ProductModal from "@/modals/vendorProductModal";
import AssignProductModal from "@/modals/AssignProductModal";
import ConfirmDialog from "@/components/shared/confirmDialog";

const PAGE_SIZE = 10;

const AllProductList = () => {

  const [vendorId] = useState(() => localStorage.getItem("vendorId"));


  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortReverse, setSortReverse] = useState(false);

  // Modal State
  const [modals, setModals] = useState({
    product: false,
    assign: false,
    confirm: false,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Build request payload
  const getRequestBody = useCallback(
    () => ({
      pagination: {
        start: (currentPage - 1) * PAGE_SIZE,
        number: PAGE_SIZE,
      },
      search: {
        predicateObject: {
          Name: searchQuery || null,
        },
      },
      sort: {
        predicate: sortBy,
        reverse: sortReverse,
      },
    }),
    [currentPage, searchQuery, sortBy, sortReverse]
  );

  // Fetch products
  const {
    mutate: fetchProducts,
    data,
    isLoading,
  } = useMutation({
    ...useVendorProducts(),
    onError: () => toast.error("Failed to load products"),
  });

  // Delete product
  const { mutate: deleteProduct, isLoading: deleting } = useMutation({
    ...useRemoveVendorProduct(),
    onSuccess: () => {
      toast.success("Product removed successfully");
      closeModal("confirm");
      setDeleteProductId(null);
      fetchProducts(getRequestBody());
    },
    onError: () => toast.error("Failed to remove product"),
  });

  // Load products on mount and when dependencies change
  useEffect(() => {
    if (!vendorId) {
      toast.error("Vendor not found");
      return;
    }
    fetchProducts(getRequestBody());
  }, [vendorId, getRequestBody, fetchProducts]);

  // Modal helpers
  const openModal = (name) => setModals((prev) => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModals((prev) => ({ ...prev, [name]: false }));

  // Handlers
  const handleSearch = useCallback((params) => {
    setSearchQuery(params.query);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    openModal("product");
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    openModal("assign");
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct({ productId });
    closeModal("product");
    openModal("assign");
  };

  const handleDeleteProduct = (productId) => {
    if (!vendorId) {
      toast.error("Vendor not found");
      return;
    }
    setDeleteProductId(productId);
    openModal("confirm");
  };

  const confirmDelete = () => {
    deleteProduct({
      vendorId,
      productId: deleteProductId,
    });
  };

  const handleAssignSuccess = () => {
    toast.success("Product assigned successfully");
    closeModal("assign");
    setSelectedProduct(null);
    fetchProducts(getRequestBody());
  };

  const handleCloseAssign = () => {
    closeModal("assign");
    setSelectedProduct(null);
  };

  // Derived state
  const products = data?.data?.items ?? [];
  const totalPages = data?.data?.numberOfPages ?? 0;
  const isEmpty = !isLoading && products.length === 0;

  return (
    <div className="w-full min-h-screen bg-[var(--color-background)] pt-8 sm:pt-20 pb-5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Add Button */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleAddProduct}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-[var(--color-secondary)] text-white hover:bg-gray-800 
                       transition-colors"
          >
            <span className="text-lg font-bold">+</span>
            Add Product
          </button>

          <SearchBar onChange={handleSearch} />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner message="Loading products..." />
        ) : isEmpty ? (
          <div className="text-center text-[var(--color-text-black)] mt-20">
            No products found
          </div>
        ) : (
          <ProductTable
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        )}

        {/* Mobile Add Button */}
        <button
          onClick={handleAddProduct}
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full 
                     bg-[var(--color-secondary)] flex sm:hidden items-center 
                     justify-center shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Add Product"
        >
          <span className="text-white text-xl font-bold">+</span>
        </button>

        {/* Modals */}
        <ProductModal
          isOpen={modals.product}
          onClose={() => closeModal("product")}
          onSelectProduct={handleProductSelect}
        />

        <AssignProductModal
          isOpen={modals.assign}
          onClose={handleCloseAssign}
          vendorId={vendorId}
          productId={selectedProduct?.productId}
          assignmentId={selectedProduct?.id}
          mode={selectedProduct?.id ? "update" : "assign"}
          initialData={selectedProduct}
          onSuccess={handleAssignSuccess}
        />

        <ConfirmDialog
          isOpen={modals.confirm}
          title="Delete Product"
          message="Are you sure you want to remove this product?"
          confirmText="Delete"
          onConfirm={confirmDelete}
          onCancel={() => closeModal("confirm")}
          loading={deleting}
        />
      </div>
    </div>
  );
};

export default AllProductList;