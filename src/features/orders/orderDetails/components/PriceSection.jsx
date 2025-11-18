export default function PriceSection({ order }) {
  // console.log(order,"order price sectin");
  
  return (
    <div className="bg-[var(--color-white)] shadow-sm w-full p-4 sm:p-5 ">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <p className="font-medium text-sm sm:text-base pb-">Total Order Price</p>
      </div>
      <div className=" flex items-start text-sm lg:text-xs md:text-xs text-[var(--color-black)]rounded-md">
        <p className="font-semibold text-base sm:text-lg pr-2"> ₹{order.amount}.00</p>
        <p className="lg:pt-2 md:pt-2">{order.payment}</p>
      </div>
      <p className="text-xs sm:text-sm text-[var(--color-black)] mt-4">
        Item sold by: {order.seller}
      </p>
    </div>
  );
}
