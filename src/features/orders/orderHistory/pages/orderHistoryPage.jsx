import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutList, LayoutGrid } from "lucide-react";
import OrderCard from "../components/OrderHistoryCard";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useOrderHistoryDataQuery } from "@/hooks/useOrderHistoryQuery";

export default function OrderHistoryPage() {

  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("column"); 

const { data: response } = useOrderHistoryDataQuery();


const orders = response || [];

// console.log(orders,"zara");


const uniqueOrders = Array.from(
  new Map(orders.map((o) => [o.orderId, o])).values()
);


// console.log(uniqueOrders[0],"uniqueOrders");


  return (
    <ContentWrapper compactScreen={true}>
      <div className="pt-8 lg:pt-36 px-2 sm:px-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-lg font-semibold">All Orders</h2>

         
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => setViewMode("column")}
              className={`p-2 rounded-md border transition ${
                viewMode === "column"
                  ? "bg-[var(--color-secondary)] text-[var(--color-white)] "
                  : "bg-[var(--color-white)] text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
              title="List View"
            >
              <LayoutList className="w-5 h-5" />
            </button>

            <button
              onClick={() => setViewMode("row")}
              className={`p-2 rounded-md border transition ${
                viewMode === "row"
                  ? "bg-[var(--color-secondary)] text-[var(--color-white)] "
                  : "bg-[var(--color-white)] text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Orders Layout */}
        <div
          className={`${
            
            viewMode === "row"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "flex flex-col gap-4"
          } sm:${
            viewMode === "row"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "flex flex-col gap-4"
          }`}
        >
          {uniqueOrders.map((order) => (
            <OrderCard
              order={order}
              key={order.orderId}
              status={order.status}
              statusColor={order.statusColor}
              amount={order.amount}
              date={order.date}
              refunded={order.refunded}
              refundDetailsLabel={order.refundDetailsLabel}
              products={order.products}
              onViewDetails={() => navigate(`/user-orders/${order.orderId}`,)}
            />
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
}

