import React, { useState } from "react";
import {
  Truck,
  Zap,
  Package,
  Shield,
  Clock,
  CheckCircle2,
  ChevronRight,
  Star,
} from "lucide-react";

const SHIPPING_OPTIONS = [
  {
    id: "express",
    label: "Express Delivery",
    carrier: "Shiprocket Priority",
    badge: "Fastest",
    badgeColor: "bg-[var(--color-secondary)] text-white",
    icon: Zap,
    iconBg: "bg-orange-50",
    iconColor: "text-[var(--color-secondary)]",
    eta: "1–2 Business Days",
    cost: 149,
    features: ["Real-time tracking", "Priority handling", "SMS alerts"],
    recommended: false,
    highlight: false,
  },
  {
    id: "premium",
    label: "Premium Shipping",
    carrier: "Shiprocket Blue Dart",
    badge: "Recommended",
    badgeColor: "bg-[var(--color-primary)] text-white",
    icon: Shield,
    iconBg: "bg-green-50",
    iconColor: "text-[var(--color-primary)]",
    eta: "2–4 Business Days",
    cost: 99,
    features: ["End-to-end tracking", "Insured delivery", "Doorstep service"],
    recommended: true,
    highlight: true,
  },
  {
    id: "standard",
    label: "Standard Delivery",
    carrier: "Shiprocket Surface",
    badge: "Economical",
    badgeColor: "bg-gray-100 text-gray-600",
    icon: Truck,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-500",
    eta: "5–7 Business Days",
    cost: 49,
    features: ["Basic tracking", "Safe packaging"],
    recommended: false,
    highlight: false,
  },
  {
    id: "free",
    label: "Free Shipping",
    carrier: "Shiprocket Economy",
    badge: "Free",
    badgeColor: "bg-blue-50 text-blue-600",
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    eta: "8–12 Business Days",
    cost: 0,
    features: ["Order tracking", "Standard packaging"],
    recommended: false,
    highlight: false,
  },
];

const ShippingSelector = ({ onShippingSelect, selectedShipping }) => {
  const [selected, setSelected] = useState(
    selectedShipping ?? SHIPPING_OPTIONS[1].id,
  );

  const handleSelect = (id) => {
    setSelected(id);
    const option = SHIPPING_OPTIONS.find((o) => o.id === id);
    onShippingSelect?.(option);
  };

  const selectedOption = SHIPPING_OPTIONS.find((o) => o.id === selected);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="p-2.5 rounded-xl shadow-sm"
          style={{ background: "var(--color-primary)" }}
        >
          <Truck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[var(--color-black)]">
            Shipping Method
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Powered by{" "}
            <span className="font-semibold text-[var(--color-secondary)]">
              Shiprocket
            </span>
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {SHIPPING_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left rounded-2xl border-2 transition-all duration-200 group
                ${
                  isSelected
                    ? option.highlight
                      ? "border-[var(--color-primary)] bg-green-50/60 shadow-md"
                      : "border-[var(--color-secondary)] bg-orange-50/40 shadow-md"
                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                }
              `}
              style={{
                outline: "none",
              }}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-2.5 rounded-xl shrink-0 transition-all ${option.iconBg} ${isSelected ? "scale-105" : ""}`}
                  >
                    <Icon className={`w-5 h-5 ${option.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm font-semibold ${
                          isSelected
                            ? option.highlight
                              ? "text-[var(--color-primary)]"
                              : "text-[var(--color-secondary)]"
                            : "text-[var(--color-black)]"
                        }`}
                      >
                        {option.label}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${option.badgeColor}`}
                      >
                        {option.badge}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {option.carrier}
                    </p>

                    {/* ETA + Cost Row */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {option.eta}
                        </span>
                      </div>
                      <div
                        className={`text-sm font-bold ${
                          option.cost === 0
                            ? "text-blue-500"
                            : isSelected
                              ? option.highlight
                                ? "text-[var(--color-primary)]"
                                : "text-[var(--color-secondary)]"
                              : "text-[var(--color-black)]"
                        }`}
                      >
                        {option.cost === 0 ? "FREE" : `₹${option.cost}`}
                      </div>
                    </div>

                    {/* Features - show when selected */}
                    {isSelected && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {option.features.map((f, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[var(--color-primary)]" />
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Radio */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                      isSelected
                        ? option.highlight
                          ? "border-[var(--color-primary)]"
                          : "border-[var(--color-secondary)]"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          option.highlight
                            ? "bg-[var(--color-primary)]"
                            : "bg-[var(--color-secondary)]"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Summary */}
      {selectedOption && (
        <div
          className="mt-4 rounded-xl p-3.5 flex items-center justify-between"
          style={{ background: "var(--color-gray)" }}
        >
          <div className="flex items-center gap-2">
            <Star
              className="w-4 h-4"
              style={{ color: "var(--color-secondary)" }}
              fill="var(--color-secondary)"
            />
            <span className="text-xs font-medium text-gray-600">
              You selected:{" "}
              <span className="font-semibold text-[var(--color-black)]">
                {selectedOption.label}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-primary)]">
            {selectedOption.cost === 0 ? "FREE" : `+ ₹${selectedOption.cost}`}
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Shiprocket Trust Line */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-gray-300" />
        <p className="text-[11px] text-gray-400">
          All shipments are secured & tracked via Shiprocket
        </p>
      </div>
    </div>
  );
};

export default ShippingSelector;
