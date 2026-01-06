"use client";

import React, { useState } from "react";
import ChartCard from "../components/ChartCard";
import {
  BarChart3,
  Droplet,
  Clock,
  CreditCard,
  Wrench,
  Shovel,
} from "lucide-react";
import CustomLineChart from "@/components/charts/CustomLineChart";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Accordion Block
const AccordionBlock = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      className="mb-4 rounded-xl bg-[var(--color-white)] border border-[var(--color-gray-light)] shadow-sm"
    >
      <motion.button
        layout
        className="w-full flex items-center justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[var(--color-secondary)]" />}
          <h2 className="text-sm font-bold text-[var(--color-primary)]">
            {title}
          </h2>
        </div>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 pt-0 text-xs text-[var(--color-black)] leading-relaxed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ResourcePanel() {
  const chartData = [
    { month: "Jan", fertilizer: 100, pesticide: 2, labor: 40 },
    { month: "Feb", fertilizer: 120, pesticide: 3, labor: 45 },
    { month: "Mar", fertilizer: 110, pesticide: 2, labor: 50 },
  ];

  const resourceMetrics = [
    { label: "Fertilizer Consumption (kg/ha)", value: "120", icon: BarChart3 },
    {
      label: "Pesticide Usage (ml/ha or sprays/season)",
      value: "3 sprays",
      icon: Droplet,
    },
    {
      label: "Over/Under Usage of Pesticides",
      value: "Within limit",
      icon: Droplet,
    },
    {
      label: "Labor Hours Logged (per operation)",
      value: "48 hrs",
      icon: Clock,
    },
    {
      label: "Cost of Inputs (₹/acre or ₹/tree)",
      value: "₹45,000",
      icon: CreditCard,
    },
    {
      label: "Equipment/Machinery Utilization Rate (%)",
      value: "75%",
      icon: Shovel,
    },
  ];

  const resourceTableData = [
    {
      resource: "Fertilizer",
      applied: 120,
      recommended: 125,
      efficiency: "96%",
    },
    { resource: "Pesticide", applied: 3, recommended: 3, efficiency: "100%" },
    { resource: "Labor", applied: 48, recommended: 50, efficiency: "96%" },
    {
      resource: "Water (L/ha)",
      applied: 500,
      recommended: 520,
      efficiency: "96%",
    },
  ];

  return (
    <ContentWrapper>
      <ChartCard title="Input & Resource Usage">
        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resourceMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="bg-[var(--color-white)] p-4 rounded-sm flex items-start space-x-3 shadow-sm"
              >
                <div className="p-2 rounded-full shadow-sm bg-[var(--color-white)]">
                  <Icon className="text-[var(--color-secondary)] w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[var(--color-black)]">
                    {metric.label}
                  </span>
                  <span className="text-lg font-bold text-[var(--color-black)]">
                    {metric.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fertilizer Trend Chart */}
        <div className="bg-[var(--color-white)] mt-6 px-5 py-8 rounded-sm text-[var(--color-black)] shadow-sm">
          <CustomLineChart data={chartData} dataKey="fertilizer" xKey="month" />
        </div>

        {/* Resource Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 rounded-sm">
            <thead className="bg-[var(--color-gray-light)]">
              <tr>
                <th className="py-2 px-3">Resource</th>
                <th className="py-2 px-3">Applied</th>
                <th className="py-2 px-3">Recommended</th>
                <th className="py-2 px-3">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {resourceTableData.map((row, idx) => (
                <tr key={idx} className="font-medium">
                  <td className="py-2 px-3">{row.resource}</td>
                  <td className="py-2 px-3">{row.applied}</td>
                  <td className="py-2 px-3">{row.recommended}</td>
                  <td className="py-2 px-3">{row.efficiency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Accordion Blocks */}
        <div className="my-6">
          <AccordionBlock
            title="Fertilizer Efficiency & Timing"
            icon={BarChart3}
          >
            Applying fertilizer at correct growth stages maximizes uptake,
            minimizes wastage, and ensures uniform crop growth.
          </AccordionBlock>

          <AccordionBlock
            title="Pesticide Management & Dosage Accuracy"
            icon={Droplet}
          >
            Accurate spray dosages reduce over-application, prevent resistance,
            and maintain environmental safety.
          </AccordionBlock>

          <AccordionBlock
            title="Labor Planning & Operation Tracking"
            icon={Clock}
          >
            Monitoring labor hours per operation helps identify bottlenecks,
            optimize workforce allocation, and improve productivity.
          </AccordionBlock>

          <AccordionBlock
            title="Cost Monitoring & Input Budgeting"
            icon={CreditCard}
          >
            Tracking input costs per acre/tree helps farmers manage expenses,
            negotiate supplier terms, and plan seasonal budgets effectively.
          </AccordionBlock>

          <AccordionBlock
            title="Equipment & Machinery Usage Optimization"
            icon={Shovel}
          >
            Proper scheduling and utilization of machinery improve efficiency,
            reduce downtime, and prolong equipment lifespan.
          </AccordionBlock>

          <AccordionBlock
            title="Sustainability & Resource Conservation"
            icon={Wrench}
          >
            Efficient use of fertilizers, pesticides, and water supports
            sustainable farming practices while minimizing environmental impact.
          </AccordionBlock>
        </div>
      </ChartCard>
    </ContentWrapper>
  );
}
