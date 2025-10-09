import React from "react";
import { CheckCircle, Clock, User, RefreshCw, Eye } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";

export default function TicketResolved({
  ticketId = "TKT-000123",
  title = "Advisory ticket resolved",
  query = "Farmer reported wilting on tomato plants and asked for advice.",
  solution = "Identified early blight. Recommend removing infected leaves, improving air circulation, and applying a copper-based fungicide according to label instructions. Monitor for 7–10 days and reapply if needed.",
  resolvedBy = "Dr. A. Patel (Plant Pathologist)",
  resolvedAt = new Date().toLocaleString(),
  tags = ["Pest & Disease", "Tomato"],
  onReopen,
  onView,
}) {
  return (
   <ContentWrapper>
     <div className="py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-[var(--color-black)]">
        Ticket Query
      </h2>

      <div className="max-w-7xl mx-auto py-4 sm:p-6 border border-[var(--color-black)] rounded-xl shadow-sm">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-none rounded-full bg-[var(--color-primary-hover)]/10 p-3">
              <CheckCircle className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-black)]">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-black)] mt-1">
                Ticket ID:{" "}
                <span className="font-medium">{ticketId}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2 sm:ml-auto">
            <span className="inline-flex items-center text-xs sm:text-sm font-medium text-[var(--color-black)] px-3 py-1 rounded-full bg-[var(--color-primary-hover)]/20">
              Resolved
            </span>
            <div className="flex items-center gap-2 text-xs text-[var(--color-black)]">
              <User className="w-4 h-4" />
              <span>{resolvedBy}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mt-5 space-y-4">
          <section>
            <h3 className="text-sm font-medium text-[var(--color-black)]">
              Farmer query
            </h3>
            <p className="mt-1 text-sm text-[var(--color-black)] leading-relaxed">
              {query}
            </p>
          </section>

          <section className="bg-[var(--color-white)] rounded-lg p-4 border border-[var(--color-black-hover)]">
            <h3 className="text-base font-medium text-[var(--color-black)]">
              Provided solution
            </h3>
            <p className="mt-1 text-sm text-[var(--color-black)] leading-relaxed">
              {solution}
            </p>
          </section>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs text-[var(--color-black)] px-3 py-1 rounded-full border border-[var(--color-black)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Footer */}
          <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--color-black)]" />
              <span>Resolved at {resolvedAt}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onView && onView(ticketId)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-black-hover)] bg-[var(--color-white)] font-medium hover:bg-[var(--color-black-hover)] transition"
              >
                <Eye className="w-4 h-4 text-[var(--color-primary)]" />
                View
              </button>

              <button
                onClick={() => onReopen && onReopen(ticketId)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-black-hover)] bg-[var(--color-white)] font-medium hover:bg-[var(--color-black-hover)] transition"
              >
                <RefreshCw className="w-4 h-4 text-[var(--color-secondary)]" />
                Reopen
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
   </ContentWrapper>
  );
}
