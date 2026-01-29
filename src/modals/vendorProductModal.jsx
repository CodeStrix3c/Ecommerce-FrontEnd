import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import { useVendorSearch } from "@/hooks/Vendor/useVedorProducts";
import { ArrowForward } from "@mui/icons-material";
import AssignProductModal from "@/modals/AssignProductModal";

const ProductModal = ({ isOpen, onClose }) => {
  const { mutate, data, isLoading } = useMutation({
    ...useVendorSearch(),
  });

  const [activeModal, setActiveModal] = useState("product");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSearch = (query) => {
    mutate({ name: query });
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setActiveModal("assign"); // ✅ switch modal
  };

  const handleAssignClose = () => {
    setActiveModal("product"); // ✅ go back to product modal
  };

  const handleProductClose = () => {
    setActiveModal("product");
    onClose(); // ✅ fully close modal flow
  };

  if (!isOpen) return null;

  return (
    <>
      {/* PRODUCT MODAL */}
      {activeModal === "product" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] md:w-[60%] lg:w-[50%]">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">Select Product</h2>
              <button
                onClick={handleProductClose}
                className="text-xl font-bold hover:opacity-70"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <SecondarySearchBar
                placeholder="Search products by name"
                onSearch={handleSearch}
              />

              {isLoading && (
                <p className="mt-4 text-sm text-gray-500">Searching…</p>
              )}

              {Array.isArray(data) && data.length > 0 && (
                <div className="mt-4 space-y-2">
                  {data.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleProductClick(item.id)}
                      className="p-2 flex justify-between border rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <ArrowForward />
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(data) && data.length === 0 && !isLoading && (
                <p className="mt-4 text-sm text-gray-500">No products found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN PRODUCT MODAL */}
      <AssignProductModal
        isOpen={activeModal === "assign"}
        onClose={handleAssignClose}
        productId={selectedProductId}
      />
    </>
  );
};

export default ProductModal;
