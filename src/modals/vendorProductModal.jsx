import { useMutation } from "@tanstack/react-query";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import { useVendorSearch } from "@/hooks/Vendor/useVedorProducts";
import { ArrowForward } from "@mui/icons-material";

const ProductModal = ({ isOpen, onClose, onSelectProduct }) => {
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

          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {Array.isArray(data) &&
              data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item.id);
                    onClose();
                  }}
                  className="p-2 mb-2 border rounded cursor-pointer flex justify-between"
                >
                  {item.name}
                  <ArrowForward />
                </div>
              ))}
          </div>

          {Array.isArray(data) && data.length === 0 && !isLoading && (
            <p className="mt-4 text-sm text-gray-500">No product found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
