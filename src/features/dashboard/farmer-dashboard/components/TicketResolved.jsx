import React from "react";
import { CheckCircle, Clock, User, RefreshCw, Eye } from "lucide-react";

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
   <div>
     <h2 className="text-3xl font-bold text-center m-6 text-[var(--color-black)]">Ticket Query</h2>
    <div
      className="max-w-6xl mx-auto bg-[var(--color-white)] p-6 border rounded-lg border-[var(--color-black)]"
    >
      <header className="flex items-start gap-4">
        <div className="flex-none rounded-full bg-[var(--color-primary-hover)]/10 p-3">
          <CheckCircle className="w-6 h-6]" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[var(--color-black)]">{title}</h2>
          <p className="text-sm text-[var(--color-black)] mt-1">
            Ticket ID: <span className="font-medium text-[var(--color-black)]">{ticketId}</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-black)] px-3 py-1 rounded-full">
            Resolved
          </span>
          <div className="flex items-center gap-2 text-xs text-[var(--color-black)]">
            <User className="w-4 h-4" />
            <span>{resolvedBy}</span>
          </div>
        </div>
      </header>

      <main className="mt-5 grid grid-cols-1 gap-4">
        <section className="rounded-lg p-4">
          <h3 className="text-sm font-medium text-[var(--color-black)]">Farmer query</h3>
          <p className="mt-1 text-sm text-[var(--color-black)]">{query}</p>
        </section>

        <section className="bg-[var(--color-white)] rounded-lg p-4 border border-[var(--color-black-hover)]">
          <h3 className="text-lg font-medium text-[var(--color-black)]">Provided solution</h3>
          <p className="mt-1 text-sm text-[var(--color-black)]">{solution}</p>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs text-[var(--color-black)] px-2 py-1 rounded-xl border border-[var(--color-black)]"
            >
              {t}
            </span>
          ))}
        </div>

        <footer className="flex items-center justify-between text-sm text-[var(--color-black)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--color-black)]" />
              <span>Resolved at {resolvedAt}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onView && onView(ticketId)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-black-hover)] bg-[var(--color-white)] text-sm font-medium shadow-sm hover:bg-[var(--color-black-hover)] focus:outline-none"
              aria-label="View full ticket"
            >
              <Eye className="w-4 h-4 text-[var(--color-primary)]" />
              View
            </button>

            <button
              onClick={() => onReopen && onReopen(ticketId)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-black-hover)] bg-[var(--color-white)] text-sm font-medium hover:bg-[var(--color-black-hover)] focus:outline-none"
              aria-label="Reopen ticket"
            >
              <RefreshCw className="w-4 h-4 text-[var(--color-secondary)]" />
              Reopen
            </button>
          </div>
        </footer>
      </main>
    </div>
   </div>
  );
}


