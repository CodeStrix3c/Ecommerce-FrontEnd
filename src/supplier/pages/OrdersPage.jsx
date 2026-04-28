import React, { useState } from "react";
import OrderStats from "../components/OrderStats";
import OrdersFilters from "../components/OrdersFilters";
import OrdersTable from "../components/OrdersTable";
import { ShoppingCart } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useGetOrders } from "@/hooks/Orders/useOrders";
import { useEffect } from "react";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  const { data: orders = [], isLoading, error } = useGetOrders();
  console.log("orders page...");

  useEffect(() => {
    // if (!orders.length) return;

    orders.forEach((order) => {
      const transferId = localStorage.getItem("transferId");

      if (order.orderStatusString === "Complete" && transferId) {
        handleReleasePayment(transferId);

        // localStorage.removeItem("transferId");
      }
    });
  }, [orders]);
  const handleReleasePayment = async (transferId) => {
    try {
      const res = await fetch("http://localhost:4000/release-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transferId }),
      });

      const data = await res.json();

      if (!data.success) {
        console.error(data.error);
        return;
      }

      toast.success(`Payment released for ${transferId}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return (
      <ContentWrapper>
        <div className="p-6 text-red-500 text-center">
          Failed to load orders.
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <div className="p-6 space-y-6">
        <div className="lg:mt-28 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-[var(--color-secondary)]" />
            <h1 className="text-2xl font-semibold">My Orders</h1>
          </div>
        </div>

        <OrdersFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <OrderStats orders={orders} />

        <OrdersTable
          orders={orders}
          search={search}
          status={status}
          dateRange={dateRange}
          isLoading={isLoading}
        />
      </div>
    </ContentWrapper>
  );
}
