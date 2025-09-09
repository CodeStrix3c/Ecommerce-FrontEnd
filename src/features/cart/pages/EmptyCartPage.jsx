import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const  EmptyCartPage =()=> {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 lg:mt-28 md:mt-28 ">
     
      <div className="p-6 bg-[var(--color-white-hover)] rounded-full shadow-md mb-6">
        <ShoppingCart className="w-16 h-16 text-[var(--color-secondary)]" />
      </div>

     
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-dark)]">
        Your cart is empty
      </h1>

      
      <p className="mt-3 text-gray-600 max-w-md">
        Looks like you haven’t added anything yet.  
        Start exploring and add items to your cart!
      </p>

      
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-white)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--color-primary)")
        }
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCartPage;
