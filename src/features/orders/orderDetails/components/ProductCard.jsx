export default function ProductCard({ product }) {
  // console.log(product,"productcardLog");
  // console.log(order, "order data");

    
  
  return (
    <>
    
      <div className="flex flex-col items-center justify-center shadow-sm w-full p-4 sm:p-6">
      <img
       src={`/${product.image}`}
        alt={product.name}
        className="w-28 h-28 sm:w-40 sm:h-40 max-w-full object-cover rounded-md mb-4"
      />
      <div className="text-center">
        <h2 className="font-semibold text-base sm:text-lg">{product.brand}</h2>
        <p className="text-[var(--color-black)] text-sm">{product.name}</p>
        <p className="text-[var(--color-black)] text-sm">Size: {product.quantity}</p>
      </div>
    </div>
    </>
  );
}
