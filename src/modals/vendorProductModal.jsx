import { useMutation } from "@tanstack/react-query";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import { useVendorSearch } from "@/hooks/Vendor/useVedorProducts";
import { ArrowForward } from "@mui/icons-material";

const ProductModal = ({
  isOpen,
  onClose,
  onSelectProduct,
  assignedProductIds = [], // ✅ NEW PROP
}) => {
  const { mutate, data, isLoading } = useMutation({
    ...useVendorSearch(),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[60%] lg:w-[45%]">
        <div className="flex justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Select Product</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-4">
          <SecondarySearchBar onSearch={(q) => mutate({ name: q })} />

          {isLoading && <p className="mt-4">Searching…</p>}

          <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
            {Array.isArray(data) &&
              data.map((item) => {
                // Safely detect correct ID field
                const productId = item?.id ?? item?._id ?? null;

                // Convert everything to string to avoid type mismatch
                const assignedSet = new Set(
                  (assignedProductIds || []).map((id) => String(id))
                );

                const isAlreadyAssigned =
                  productId && assignedSet.has(String(productId));

                return (
                  <div
                    key={productId}
                    className={`p-2 border rounded ${isAlreadyAssigned
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-50"
                      }`}
                    onClick={() => {
                      if (isAlreadyAssigned) return;

                      onSelectProduct(productId);
                      onClose();
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      {!isAlreadyAssigned && <ArrowForward />}
                    </div>

                    {isAlreadyAssigned && (
                      <p className="text-xs text-red-500 mt-1">
                        This product is already assigned
                      </p>
                    )}
                  </div>
                );
              })}


            {Array.isArray(data) && data.length === 0 && !isLoading && (
              <p className="mt-4 text-sm text-gray-500">No product found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductModal;
