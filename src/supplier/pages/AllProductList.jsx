import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  useVendorProducts,
  useRemoveVendorProduct,
} from "@/hooks/Vendor/useVedorProducts";
import SearchBar from "@/components/shared/SearchBar";
import LoadingSpinner from "../components/loadingSpinner";
import { toast } from "react-toastify";
import ProductTable from "../components/productCard";
import Pagination from "../components/paginationComponent";
import ProductModal from "@/modals/vendorProductModal";
import AssignProductModal from "@/modals/AssignProductModal";
import ConfirmDialog from "@/components/shared/confirmDialog";

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

  /* ================= API ================= */
  const { mutate: fetchProducts, data, isLoading } = useMutation({
    ...useVendorProducts(),
    onError: (err) => {
      console.error(err);
      toast.error("Failed to load products");
    },
  });

  const { mutate: deleteProduct, isLoading: deleting } = useMutation({
    ...useRemoveVendorProduct(),
    onSuccess: () => {
      toast.success("Product removed successfully");
      setConfirmOpen(false);
      fetchProducts(buildRequestBody());
    },
    onError: () => toast.error("Failed to remove product"),
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
    [currentPage, searchParams, sortBy, sortReverse]
  );

  useEffect(() => {
    if (!vendorId) {
      toast.error("Vendor not found");
      return;
    }
    fetchProducts(buildRequestBody());
  }, [vendorId, buildRequestBody, fetchProducts]);

  const products = data?.data?.items ?? [];
  const totalPages = data?.data?.numberOfPages ?? 0;


  const handleDeleteProduct = (id) => {
    setDeleteProductId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct({ vendorId, productId: deleteProductId });
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setAssignModalOpen(true);
  };

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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortReverse((prev) => !prev);
    } else {
      setSortBy(column);
      setSortReverse(false);
    }
    setCurrentPage(1);
  };


  return (
    <div className="w-full bg-[var(--color-background)] pt-3 pb-28">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">


        <div className="mt-4 mb-6 flex justify-end">
          <div className="w-56 sm:w-60">
            <SearchBar onChange={setSearchParams} />
          </div>
        </div>




        {isLoading ? (
          <LoadingSpinner message="Loading products..." />
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

            <div className="mt-6 flex justify-center overflow-x-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

        <button
          onClick={() => setProductModalOpen(true)}
          className="
    fixed bottom-6 right-6
    md:static                    
    md:ml-auto                    
    md:mr-0

    h-10 w-10 rounded-full
    bg-[var(--color-secondary)]
    flex items-center justify-center
    shadow-2xl z-50

    hover:scale-105 active:scale-95 transition
  "
        >
          <span className="text-white text-3xl leading-none">+</span>
        </button>


        {/* MODALS */}
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
