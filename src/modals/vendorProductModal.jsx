import { useMutation } from "@tanstack/react-query";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import { useVendorSearch } from "@/hooks/Vendor/useVedorProducts";

const ProductModal = ({ isOpen, onClose }) => {
  const { mutate, data, isLoading } = useMutation({
    ...useVendorSearch(),
  });

  console.log(data, "modal data");
  const handleSearch = (query) => {
    mutate({ name: query }); // ✅ GET param only
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[60%] lg:w-[50%]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Select Product</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:opacity-70"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <SecondarySearchBar
            placeholder="Search products by name"
            onSearch={handleSearch}
          />

          {isLoading && (
            <p className="mt-4 text-sm text-gray-500">Searching…</p>
          )}

          {data?.length > 0 && (
            <div className="mt-4 space-y-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
