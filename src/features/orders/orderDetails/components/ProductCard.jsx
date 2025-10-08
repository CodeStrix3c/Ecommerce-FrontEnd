export default function ProductCard({ order }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[var(--color-black-hover)] shadow-sm w-full p-4 sm:p-6">
      <img
        src={order.image}
        alt={order.name}
        className="w-28 h-28 sm:w-40 sm:h-40 max-w-full object-cover rounded-md mb-4"
      />
      <div className="text-center">
        <h2 className="font-semibold text-base sm:text-lg">{order.brand}</h2>
        <p className="text-[var(--color-black)] text-sm">{order.name}</p>
        <p className="text-[var(--color-black)] text-sm">Size: {order.size}</p>
      </div>
    </div>
  );
}
