import { useMemo, useState, useCallback } from "react";
import { Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

/* ================= SORT COLUMNS ================= */
const SORT_COLUMNS = {
  NAME: "name",
  PRICE: "price",
  DISCOUNT: "discount",
  QTY: "qty",
  STATUS: "status",
  DATE: "date",
};

/* ================= DATE FORMATTER ================= */
const formatDateTime = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ProductTable = ({ products = [], onDelete, onEdit }) => {
  const [sortBy, setSortBy] = useState(SORT_COLUMNS.NAME);
  const [sortReverse, setSortReverse] = useState(false);

  /* ================= SORT HANDLER ================= */
  const handleSort = useCallback((column) => {
    setSortBy((prev) => {
      if (prev === column) {
        setSortReverse((r) => !r);
        return prev;
      }
      setSortReverse(false);
      return column;
    });
  }, []);

  /* ================= SORTED PRODUCTS ================= */
  const sortedProducts = useMemo(() => {
    if (!products.length) return [];

    const comparators = {
      [SORT_COLUMNS.NAME]: (a, b) =>
        a.productName.localeCompare(b.productName),

      [SORT_COLUMNS.PRICE]: (a, b) =>
        a.assignedPrice - b.assignedPrice,

      [SORT_COLUMNS.DISCOUNT]: (a, b) =>
        (a.discountPrice || 0) - (b.discountPrice || 0),

      [SORT_COLUMNS.QTY]: (a, b) =>
        a.stockQuantity - b.stockQuantity,

      [SORT_COLUMNS.STATUS]: (a, b) =>
        Number(a.isActive) - Number(b.isActive),

      [SORT_COLUMNS.DATE]: (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime(),
    };

    const comparator =
      comparators[sortBy] || comparators[SORT_COLUMNS.NAME];

    const sorted = [...products].sort(comparator);
    return sortReverse ? sorted.reverse() : sorted;
  }, [products, sortBy, sortReverse]);

  if (!sortedProducts.length) {
    return (
      <div className="text-center text-sm text-[var(--color-gray-dark)] py-12">
        No products found ...
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* Desktop Table */}
      <DesktopTable
        products={sortedProducts}
        sortBy={sortBy}
        sortReverse={sortReverse}
        onSort={handleSort}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* Mobile Cards */}
      <MobileCards
        products={sortedProducts}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};


const DesktopTable = ({
  products,
  sortBy,
  sortReverse,
  onSort,
  onEdit,
  onDelete,
}) => {
  const SortIcon = ({ column }) => {
    if (sortBy !== column) {
      return <ArrowUpDown size={16} className="opacity-50" />;
    }
    return sortReverse ? <ArrowDown size={16} /> : <ArrowUp size={16} />;
  };

  const SortHeader = ({ column, label, align = "left" }) => {
    const alignClass = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[align];

    return (
      <button
        onClick={() => onSort(column)}
        className={`flex items-center gap-1 ${alignClass} w-full
        hover:text-[var(--color-secondary)] transition-colors`}
      >
        {label}
        <SortIcon column={column} />
      </button>
    );
  };

  return (
    <div className="hidden sm:block overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* HEADER */}
        <div
          className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1.8fr_1.2fr_100px]
          gap-4 px-5 py-3 text-xs font-semibold uppercase
          text-[var(--color-black)] border-b bg-[var(--color-gray-white)]"
        >
          <SortHeader column={SORT_COLUMNS.NAME} label="Product Name" />
          <SortHeader column={SORT_COLUMNS.PRICE} label="Price" align="right" />
          <SortHeader column={SORT_COLUMNS.DISCOUNT} label="Our Price" align="right" />
          <SortHeader column={SORT_COLUMNS.QTY} label="Qty" align="right" />
          <SortHeader column={SORT_COLUMNS.DATE} label="Date & Time" align="center" />
          <SortHeader column={SORT_COLUMNS.STATUS} label="Status" align="center" />
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <ProductRow
              key={product.productId}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


const ProductRow = ({ product, onEdit, onDelete }) => (
  <div
    className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1.8fr_1.2fr_100px]
    gap-4 items-center px-5 py-4 hover:bg-gray-50"
  >
    <span className="text-sm font-medium truncate">
      {product.productName}
    </span>

    <span className="text-sm font-semibold text-right">
      ₹{product.assignedPrice.toLocaleString()}
    </span>

    <span className="text-sm text-right">
      ₹{(product.discountPrice || 0).toLocaleString()}
    </span>

    <span className="text-sm text-right">
      {product.stockQuantity}
    </span>

    {/* DATE + TIME */}
    <span className="text-sm text-center whitespace-nowrap">
      {formatDateTime(product.createdAt)}
    </span>

    <div className="flex justify-center">
      <StatusBadge isActive={product.isActive} />
    </div>

    <ActionButtons
      onEdit={() => onEdit(product)}
      onDelete={() => onDelete(product.productId)}
    />
  </div>
);


const MobileCards = ({ products, onEdit, onDelete }) => (
  <div className="sm:hidden space-y-3">
    {products.map((product) => (
      <MobileCard
        key={product.productId}
        product={product}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);

const MobileCard = ({ product, onEdit, onDelete }) => (
  <div className="rounded-lg border bg-white p-4 shadow-sm">
    <div className="flex justify-between mb-2">
      <h3 className="text-sm font-semibold line-clamp-2">
        {product.productName}
      </h3>
      <StatusBadge isActive={product.isActive} />
    </div>

    <div className="grid grid-cols-2 gap-3 mb-2">
      <InfoItem label="Price" value={`₹${product.assignedPrice}`} />
      <InfoItem label="Discount" value={`₹${product.discountPrice || 0}`} />
      <InfoItem label="Qty" value={product.stockQuantity} />
      <InfoItem
        label="Date & Time"
        value={formatDateTime(product.createdAt)}
      />
    </div>

    <div className="flex justify-end pt-2 border-t">
      <ActionButtons
        onEdit={() => onEdit(product)}
        onDelete={() => onDelete(product.productId)}
      />
    </div>
  </div>
);


const StatusBadge = ({ isActive }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium
    ${isActive
        ? "bg-green-200 text-green-700"
        : "bg-red-100 text-red-700"
      }`}
  >
    {isActive ? "Active" : "Inactive"}
  </span>
);

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex gap-3">
    <button onClick={onEdit} title="Edit">
      <Pencil size={18} />
    </button>
    <button onClick={onDelete} title="Delete">
      <Trash2 size={18} />
    </button>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default ProductTable;
