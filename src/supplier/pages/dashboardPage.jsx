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



const stats = [
  {
    label: "Total Craft Revenue",
    value: "₹0",
    icon: IndianRupee,
    color: "var(--color-primary)",
  },
  {
    label: "Total Craft Orders",
    value: "0",
    icon: ShoppingCart,
    color: "var(--color-secondary)",
  },
  {
    label: "Handmade Products",
    value: "0",
    icon: Package,
    color: "var(--color-primary)",
  },
  {
    label: "Pending Shipments",
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
  { name: "Handmade Clay Diyas", qty: 0 },
  { name: "Macrame Wall Hanging", qty: 0 },
  { name: "Hand Painted Vase", qty: 0 },
  { name: "Wooden Craft Frames", qty: 0 },
];

const recentOrders = [
  {
    id: "#AC-8829",
    customer: "Customer – Rahul Sharma",
    status: "Processing",
    amount: "₹0",
  },
  {
    id: "#AC-8827",
    customer: "Craft Store – Artify Studio",
    status: "Shipped",
    amount: "₹0",
  },
];

const pendingOrders = [
  { id: "#AC-8831", buyer: "Customer – Suresh", days: "N/A", amount: "₹0" },
  {
    id: "#AC-8830",
    buyer: "Craft Store – CraftNest",
    days: "N/A",
    amount: "₹0",
  },
  { id: "#AC-8832", buyer: "Customer – Anita", days: "N/A", amount: "₹0" },
  {
    id: "#AC-8833",
    buyer: "Gift Store – DecorHive",
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
            Art & Craft Vendor Dashboard
          </h1>
          <p className="text-sm text-[var(--color-black)]">
            Handmade product sales, inventory & artisan performance overview
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
                <div className="flex items-center mb-3">
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

                <h3
                  className="text-lg sm:text-2xl font-semibold leading-tight"
                  style={{ color: item.color }}
                >
                  {item.value}
                </h3>

                <div
                  className="mt-3 h-1 w-10 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            );
          })}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-medium text-[var(--color-black)] mb-1">
              Monthly Craft Revenue (₹)
            </h2>
            <p className="text-md text-[var(--color-black)] mb-4">
              Revenue from handmade and artisan craft products
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
            <h2 className="text-lg font-medium mb-4">Low Stock – Craft Products</h2>

            <ul className="space-y-4">
              {lowStock.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between items-center p-3 rounded-xl border border-[var(--color-gray)]"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-[var(--color-error)]">
                      {item.qty === 0 ? "Out of stock" : `${item.qty} left`}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[var(--color-error)]">
                    Alert
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>


        <div className="bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">
            Recent Craft Orders
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
                <tr key={o.id} className="block sm:table-row border-b mt-4">
                  <td className="block sm:table-cell py-1 font-medium">{o.id}</td>
                  <td className="block sm:table-cell py-1">{o.customer}</td>
                  <td className="block sm:table-cell py-1 font-medium text-[var(--color-secondary)]">
                    {o.status}
                  </td>
                  <td className="block sm:table-cell py-1">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-[var(--color-secondary)]">
              Pending Craft Orders
            </h2>

            <table className="w-full text-xs sm:text-sm block sm:table">
              <tbody className="block sm:table-row-group">
                {pendingOrders.map((o) => (
                  <tr key={o.id} className="block sm:table-row border-b mt-4">
                    <td className="py-1 font-medium">{o.id}</td>
                    <td className="py-1">{o.buyer}</td>
                    <td className="py-1 text-[var(--color-secondary)]">{o.days}</td>
                    <td className="py-1">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[var(--color-white)] rounded-2xl p-4 sm:p-6 border border-[var(--color-gray)] shadow-sm">
            <h2 className="text-lg font-semibold mb-6 text-[var(--color-secondary)]">
              Shipping Status
            </h2>

            <ul className="space-y-6">
              {dispatchStats.map((item) => (
                <li key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-semibold" style={{ color: item.color }}>
                      {item.value}
                    </span>
                  </div>

                  <div className="w-full h-1 rounded-full bg-[var(--color-gray)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.value * 8}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-[var(--color-black)]">
              Live overview of craft order shipping stages
            </p>
          </div>

        </div>

      </div>
    </ContentWrapper>
  );
}
