export default function PriceSection({ order }) {
  return (
    <div className="bg-[var(--color-white)] shadow-sm w-full p-4 sm:p-5 ">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <p className="font-medium text-sm sm:text-base">Total Order Price</p>
        <p className="font-semibold text-base sm:text-lg">₹{order.price}.00</p>
      </div>
      <div className="mt-3 w-full bg-[var(--color-black-hover)] text-[var(--color-black)] py-2 font-medium text-center rounded-md">
        {order.payment}
      </div>
      <p className="text-xs sm:text-sm text-[var(--color-black)] mt-2">
        Item sold by: {order.seller}
      </p>
    </div>
  );
}
