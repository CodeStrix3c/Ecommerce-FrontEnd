import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IndianRupee, ShoppingCart, Package, Truck } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

/* ===================== DATA ===================== */

const stats = [
  {
    label: "Total Agro Revenue",
    value: "₹0",
    icon: IndianRupee,
    color: "var(--color-primary)",
  },
  {
    label: "Total Farm Orders",
    value: "0",
    icon: ShoppingCart,
    color: "var(--color-secondary)",
  },
  {
    label: "Pesticide Products",
    value: "0",
    icon: Package,
    color: "var(--color-primary)",
  },
  {
    label: "Pending Dispatches",
    value: "0",
    icon: Truck,
    color: "var(--color-error)",
  },
];

const monthlyData = [
  { month: "Jan", revenue: 0 },
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
  { month: "Apr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
];

const lowStock = [
  { name: "Chlorpyrifos 20% EC", qty: 0 },
  { name: "Neem Oil Concentrate", qty: 0 },
  { name: "Imidacloprid 17.8% SL", qty: 0 },
  { name: "Neem Oil Concentrate", qty: 0 },
];

const recentOrders = [
  {
    id: "#ZR-8829",
    customer: "Farmer – Rahul Patil",
    status: "Processing",
    amount: "₹0",
  },
  {
    id: "#ZR-8827",
    customer: "Agro Store – GreenGrow",
    status: "Shipped",
    amount: "₹0",
  },
];

const pendingOrders = [
  { id: "#ZR-8831", buyer: "Farmer – Suresh", days: "N/A", amount: "₹0" },
  {
    id: "#ZR-8830",
    buyer: "Agro Store – KisanMart",
    days: "N/A",
    amount: "₹0",
  },
  { id: "#ZR-8831", buyer: "Farmer – Suresh", days: "N/A", amount: "₹0" },
  {
    id: "#ZR-8830",
    buyer: "Agro Store – KisanMart",
    days: "N/A",
    amount: "₹0",
  },
];

const dispatchStats = [
  { label: "Processing", value: 0, color: "var(--color-secondary)" },
  { label: "Ready to Ship", value: 0, color: "var(--color-primary)" },
  { label: "Delayed", value: 0, color: "var(--color-error)" },
];

/* ===================== COMPONENT ===================== */

export default function VendorDashboard() {
  return (
    <ContentWrapper>
      <div className="min-h-screen bg-[var(--color-light)] py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[var(--color-black)]">
            Art&Vendor Dashboard
          </h1>
          <p className="text-sm text-[var(--color-black)]">
            Pesticide sales, inventory & agricultural performance overview
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm"
              >
                {/* Icon + Label */}
                <div className="flex items-center  mb-3">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-[var(--color-black)] leading-tight">
                    {item.label}
                  </p>
                </div>

                {/* Value */}
                <h3
                  className="text-lg sm:text-2xl font-semibold leading-tight"
                  style={{ color: item.color }}
                >
                  {item.value}
                </h3>

                {/* Accent */}
                <div
                  className="mt-3 h-1 w-10 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            );
          })}
        </div>

        {/* REVENUE + LOW STOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-medium text-[var(--color-black)] mb-1">
              Monthly Pesticide Revenue (₹)
            </h2>
            <p className="text-sm text-[var(--color-black)] mb-4">
              Revenue from pesticide & crop-protection products
            </p>

            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-secondary)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-medium mb-4">Low Stock – Pesticides</h2>

            <ul className="space-y-4">
              {lowStock.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center p-3 rounded-xl border border-[var(--color-gray)]"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p
                      className={`text-xs ${item.qty === 0
                        ? "text-[var(--color-error)]"
                        : "text-[var(--color-secondary)]"
                        }`}
                    >
                      {item.qty === 0
                        ? "Out of stock"
                        : `${item.qty} packs left`}
                    </p>
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{
                      color:
                        item.qty === 0
                          ? "var(--color-error)"
                          : "var(--color-secondary)",
                    }}
                  >
                    Alert
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">
            Recent Farm Orders
          </h2>

          <table className="w-full text-xs sm:text-sm block sm:table">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b text-[var(--color-black)] mt-4">
                <th className="py-3 text-left">Order ID</th>
                <th className="text-left">Buyer</th>
                <th className="text-left">Status</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="block sm:table-row-group">
              {recentOrders.map((o) => (
                <tr
                  key={o.id}
                  className="block sm:table-row border-b last:border-none mt-4 first:mt-0 sm:mt-0 "
                >
                  <td className="block sm:table-cell py-1 font-medium">
                    {o.id}
                  </td>
                  <td className="block sm:table-cell py-1">{o.customer}</td>
                  <td
                    className={`block sm:table-cell py-1 font-medium ${o.status === "Processing"
                      ? "text-[var(--color-secondary)]"
                      : "text-[var(--color-primary)]"
                      }`}
                  >
                    {o.status}
                  </td>
                  <td className="block sm:table-cell py-1">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PENDING + DISPATCH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">
              Pending Orders
            </h2>

            <table className="w-full text-xs sm:text-sm block sm:table">
              <thead className="hidden sm:table-header-group">
                <tr className="border-b text-[var(--color-black)]">
                  <th className="py-3 text-left">Order</th>
                  <th className="text-left">Buyer</th>
                  <th className="text-left">Days</th>
                  <th className="text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="block sm:table-row-group">
                {pendingOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="block sm:table-row border-b last:border-none mt-4 first:mt-0 sm:mt-0"
                  >
                    <td className="block sm:table-cell py-1 font-medium">
                      {o.id}
                    </td>
                    <td className="block sm:table-cell py-1">{o.buyer}</td>
                    <td className="block sm:table-cell py-1 text-[var(--color-secondary)]">
                      {o.days}
                    </td>
                    <td className="block sm:table-cell py-1">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-semibold mb-6 text-[var(--color-secondary)]">
              Dispatch Status
            </h2>

            <ul className="space-y-6">
              {dispatchStats.map((item) => (
                <li key={item.label}>
                  {/* Label + Value */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--color-black)]">
                      {item.label}
                    </span>

                    <span
                      className="text-sm font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full h-1 rounded-full bg-[var(--color-gray)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.value * 8}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer Hint */}
            <p className="mt-6 text-xs text-[var(--color-black)] ">
              Live overview of current order dispatch stages
            </p>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
