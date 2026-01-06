import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== Load invoices ===== */
  useEffect(() => {
    setLoading(true);

    const stored = JSON.parse(localStorage.getItem("Invoices") || "[]");
    setInvoice(stored);

    setLoading(false);
  }, []);

  /* ===== Delete ===== */
  const deleteInvoice = (id) => {
    setLoading(true);

    const updated = invoice.filter((it) => it.id !== id);
    setInvoice(updated);
    localStorage.setItem("Invoices", JSON.stringify(updated));

    setTimeout(() => setLoading(false), 300);
  };

  /* ===== Metrics ===== */
  const totalAmount = useMemo(
    () =>
      invoice.reduce(
        (sum, t) => sum + (Number(t.totals?.grandTotal) || 0),
        0
      ),
    [invoice]
  );

  const paidAmount = useMemo(
    () =>
      invoice
        .filter((it) => it.status === "Paid")
        .reduce(
          (sum, t) => sum + (Number(t.totals?.grandTotal) || 0),
          0
        ),
    [invoice]
  );

  const unPaidAmount = useMemo(
    () =>
      invoice
        .filter((it) => it.status === "Unpaid")
        .reduce(
          (sum, t) => sum + (Number(t.totals?.grandTotal) || 0),
          0
        ),
    [invoice]
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111]">
      {/* ===== Loader ===== */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading invoices…</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-7 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Invoice overview
            </p>
          </div>

          <Link
            to="/create-invoice"
            className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50 transition"
          >
            New invoice
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-8 py-14 space-y-20">
        {/* Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl border px-7 py-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total amount
            </p>
            <p className="mt-4 text-3xl font-medium tabular-nums">
              ₹{totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-xl border px-7 py-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Paid
            </p>
            <p className="mt-4 text-2xl font-medium text-green-600 tabular-nums">
              ₹{paidAmount.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-xl border px-7 py-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Unpaid
            </p>
            <p className="mt-4 text-2xl font-medium text-red-500 tabular-nums">
              ₹{unPaidAmount.toFixed(2)}
            </p>
          </div>
        </section>

        {/* Table */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-gray-700">
              Recent invoices
            </h2>
            <span className="text-xs text-gray-400">
              {invoice.length} total
            </span>
          </div>

          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#FBFBFB] border-b">
                <tr className="text-gray-500">
                  <th className="px-6 py-4 text-left font-medium">
                    Invoice
                  </th>
                  <th className="px-6 py-4 text-left font-medium">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left font-medium">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-medium">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoice.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-24 text-center text-gray-400"
                    >
                      No invoices yet
                    </td>
                  </tr>
                ) : (
                  invoice.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b last:border-none hover:bg-[#FAFAFA] transition group"
                    >
                      <td className="px-6 py-5 font-medium">
                        {inv.invoice.invoiceNo}
                      </td>

                      <td className="px-6 py-5">
                        {inv.client.name}
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 text-xs">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              inv.status === "Paid"
                                ? "bg-green-500"
                                : inv.status === "Unpaid"
                                ? "bg-red-500"
                                : "bg-gray-400"
                            }`}
                          />
                          {inv.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 font-medium tabular-nums">
                        ₹{inv.totals.grandTotal}
                      </td>

                      <td className="px-6 py-5 text-right space-x-4 opacity-0 group-hover:opacity-100 transition">
                        <Link
                          to={`/view/${inv.id}`}
                          className="text-gray-500 hover:text-black"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit/${inv.id}`}
                          className="text-gray-500 hover:text-black"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteInvoice(inv.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="text-xs text-gray-400">
          © 2025 InvoicePro
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
