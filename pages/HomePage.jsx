import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditInvoice from "./EditInvoice";

const HomePage = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Invoices") || "[]");
    setInvoice(stored);
  }, []);

  const deleteInvoice = (id) => {
    const updated = invoice.filter((it) => it.id !== id);
    setInvoice(updated);
    localStorage.setItem("Invoices", JSON.stringify(updated));
  };

 
  const totalAmount = useMemo(() => {
    return invoice.reduce(
      (sum, t) => sum + (Number(t.totals?.grandTotal) || 0),
      0
    );
  }, [invoice]);

  const paidAmount = useMemo(() => {
    return invoice
      .filter((it) => it.status === "Paid")
      .reduce((sum, t) => sum + (Number(t.totals?.grandTotal) || 0), 0);
  }, [invoice]);

  const unPaidAmount = useMemo(() => {
    return invoice
      .filter((it) => it.status === "Unpaid")
      .reduce((sum, t) => sum + (Number(t.totals?.grandTotal) || 0), 0);
  }, [invoice]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-700 to-indigo-800 text-white shadow-2xl flex flex-col rounded-r-3xl">
        <div className="p-6 flex items-center gap-4 border-b border-white/20">
          <img
            src="https://cdn.shopify.com/app-store/listing_images/9b3118ba56c6d87065a482f1aa1eea6e/icon/COLp1aXC-IMDEAE=.png"
            className="w-15  rounded-xl border border-white/40 shadow-xl"
          />
          <div>
            <h1 className="font-extrabold text-2xl leading-none">InvoicePro</h1>
            <p className="text-sm opacity-80">Billing System</p>
          </div>
        </div>

        <nav className="mt-6 px-4 flex-1 space-y-3">
          <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between transition">
            <span className="font-medium">Dashboard</span>
            <span>📊</span>
          </button>

          <Link
            to="/create-invoice"
            className="block w-full py-3 px-4 bg-white/5 hover:bg-white/20 rounded-xl transition flex items-center justify-between"
          >
            <span>Invoices</span> 🧾
          </Link>
        </nav>

        <div className="p-6">
          <div className="bg-white/10 p-4 rounded-xl text-center text-sm opacity-80">
            © 2025 InvoicePro
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        {/* Floating top right decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your invoices efficiently
            </p>
          </div>

          <Link
            to="/create-invoice"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 shadow-xl text-white rounded-2xl font-semibold transition"
          >
            + New Invoice
          </Link>
        </div>

        {/* Creative Stats Section */}
        <div className="grid grid-cols-3 gap-8">
          <div className="relative bg-white rounded-3xl p-6 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-200 rounded-full blur-2xl opacity-30"></div>
            <p className="text-gray-500 text-sm">Total Amount</p>
            <h1 className="text-4xl font-bold mt-3 group-hover:text-blue-700 transition">
              ₹{totalAmount.toFixed(2)}
            </h1>
            <p className="text-xs text-gray-400 mt-2">Updated now</p>
          </div>

          <div className="relative bg-white rounded-3xl p-6 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-green-200 rounded-full blur-2xl opacity-30"></div>
            <p className="text-gray-500 text-sm">Total Paid</p>
            <h1 className="text-4xl font-bold mt-3 group-hover:text-green-700 transition">
              ₹{paidAmount.toFixed(2)}
            </h1>
            <p className="text-xs text-gray-400 mt-2">All invoices cleared</p>
          </div>

          <div className="relative bg-white rounded-3xl p-6 shadow-xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-200 rounded-full blur-2xl opacity-30"></div>
            <p className="text-gray-500 text-sm">Total Unpaid</p>
            <h1 className="text-4xl font-bold mt-3 group-hover:text-red-600 transition">
              ₹{unPaidAmount.toFixed(2)}
            </h1>
            <p className="text-xs text-gray-400 mt-2">No pending dues</p>
          </div>
        </div>

        {/* Creative Invoice Table */}
        <section className="bg-white mt-14 p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
          {/* Background shape */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

          <h3 className="text-2xl font-bold mb-6 relative z-10 flex items-center gap-2">
            📑 Recent Invoices
          </h3>

          <table className="w-full text-left border-separate border-spacing-y-3 relative z-10">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th className="py-2 px-2">Invoice ID</th>
                <th className="py-2 px-2">Client</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {invoice.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No invoices yet. Create your first invoice!
                  </td>
                </tr>
              ) : (
                invoice.map((inv) => (
                  <tr
                    key={inv.id}
                    className="bg-gray-50 hover:bg-gray-100 shadow-sm rounded-xl transition"
                  >
                    <td className="py-3 px-3 font-semibold">
                      {inv.invoice.invoiceNo}
                    </td>
                    <td className="px-3">{inv.client.name}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inv.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "Unpaid"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    <td className="px-3 font-semibold">
                      ₹{inv.totals.grandTotal}
                    </td>
                    <td className="px-3 text-right">
                      <Link
                        to={`/view/${inv.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View →
                      </Link>
                      <button
                        onClick={() => deleteInvoice(inv.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                      <Link
                        to={`/edit/${inv.id}`}
                        className="text-yellow-600 hover:underline mr-3"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
