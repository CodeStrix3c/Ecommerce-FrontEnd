import {
  Pencil,
  Trash2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function DataTable() {
  const rows = [
    {
      id: 1,
      name: "Alyvia Kelley",
      status: "Approved",
      email: "tansha@gmail.com",
      contact: "0300-1234567",
    },
    {
      id: 2,
      name: "Jaiden Nixon",
      status: "Approved",
      email: "sehar@gmail.com",
      contact: "0301-9876543",
    },
    {
      id: 3,
      name: "Ace Foley",
      status: "Blocked",
      email: "qurat@gmail.com",
      contact: "0312-5556667",
    },
    {
      id: 4,
      name: "Nikola Schmidt",
      status: "Rejected",
      email: "umar@gmail.com",
      contact: "0321-4443332",
    },
    {
      id: 5,
      name: "Alyvia Kelley",
      status: "Approved",
      email: "tansha@gmail.com",
      contact: "0333-7778889",
    },
    {
      id: 6,
      name: "Alyvia Kelley",
      status: "Approved",
      email: "tansha@gmail.com",
      contact: "0300-1234567",
    },
    {
      id: 7,
      name: "Jaiden Nixon",
      status: "Approved",
      email: "sehar@gmail.com",
      contact: "0301-9876543",
    },
    {
      id: 8,
      name: "Ace Foley",
      status: "Blocked",
      email: "qurat@gmail.com",
      contact: "0312-5556667",
    },
    {
      id: 9,
      name: "Nikola Schmidt",
      status: "Rejected",
      email: "umar@gmail.com",
      contact: "0321-4443332",
    },
    {
      id: 10,
      name: "Alyvia Kelley",
      status: "Approved",
      email: "tansha@gmail.com",
      contact: "0333-7778889",
    },
    {
      id: 11,
      name: "Alyvia Kelley",
      status: "Approved",
      email: "tansha@gmail.com",
      contact: "0300-1234567",
    },
    {
      id: 12,
      name: "Jaiden Nixon",
      status: "Approved",
      email: "sehar@gmail.com",
      contact: "0301-9876543",
    },
    {
      id: 13,
      name: "Ace Foley",
      status: "Blocked",
      email: "qurat@gmail.com",
      contact: "0312-5556667",
    },
    {
      id: 14,
      name: "Nikola Schmidt",
      status: "Rejected",
      email: "umar@gmail.com",
      contact: "0321-4443332",
    },
    {
      id: 15,
      name: "Alyvia Kelley",
      status: "Approved",
      email: "tansha@gmail.com",
      contact: "0333-7778889",
    },
  ];

  /* Pagination */
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedRows = rows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-[var(--color-white)] rounded-2xl overflow-hidden">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-black-hover)]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                Full Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                E-Mail
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                Contact
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-[var(--color-black-hover)]/60 transition"
              >
                <td className="px-4 py-3">{row.id}</td>

                <td className="px-4 py-3 font-medium">{row.name}</td>

                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>

                <td className="px-4 py-3">{row.email}</td>

                <td className="px-4 py-3">{row.contact}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-[var(--color-black-hover)]">
                      <ArrowUpRight size={16} />
                    </button>

                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-[var(--color-black-hover)]">
                      <Pencil size={16} />
                    </button>

                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden p-3 space-y-4">
        {paginatedRows.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl border border-[var(--color-gray)] p-4 bg-[var(--color-white)] shadow-sm space-y-4"
          >
            {/* Top Row: Name + Status */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--color-black)]">
                  {row.name}
                </p>
                <p className="text-xs text-[var(--color-black)]">
                  ID: {row.id}
                </p>
              </div>

              <StatusBadge status={row.status} />
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-black)]">Email</span>
                <span className="font-medium text-right break-all">
                  {row.email}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-black)]">Contact</span>
                <span className="font-medium">{row.contact}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--color-gray)]" />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-[var(--color-black-hover)] transition"
                aria-label="View"
              >
                <ArrowUpRight size={16} />
              </button>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-[var(--color-black-hover)] transition"
                aria-label="Edit"
              >
                <Pencil size={16} />
              </button>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t">
        <p className="text-xs">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md border disabled:opacity-40 hover:bg-[var(--color-black-hover)]"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md border disabled:opacity-40 hover:bg-[var(--color-black-hover)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
