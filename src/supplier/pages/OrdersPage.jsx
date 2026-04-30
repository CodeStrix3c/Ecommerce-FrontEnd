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
    const transferId = localStorage.getItem("transferId");
    const livePayOrderId = localStorage.getItem("livePayOrderId");

    if (!orders.length || !transferId || !livePayOrderId) return;

    orders.forEach((order) => {
      if (
        order.orderStatusString === "Complete" &&
        String(order.id) === String(livePayOrderId)
      ) {
        handleReleasePayment(transferId);

        // Optional cleanup (recommended to prevent duplicate calls)
        localStorage.removeItem("transferId");
        localStorage.removeItem("livePayOrderId");
      }
    });
  }, [orders]);
  const handleReleasePayment = async (transferId) => {
    try {
      const res = await fetch(
        "https://ai-ecomintegration-c2ffbzcxg0a9dtdj.centralindia-01.azurewebsites.net/release-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transferId }),
        },
      );

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
