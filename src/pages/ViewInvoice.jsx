import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PrintableInvoice from "./PrintableInvoice";

const ViewInvoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const stored = JSON.parse(localStorage.getItem("Invoices") || "[]");
    const found = stored.find(
      (it) => String(it.id) === String(id)
    );

    setInvoiceData(found || null);
    setLoading(false);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111]">
      {/* ===== Loader ===== */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading invoice…</p>
          </div>
        </div>
      )}

      {!loading && !invoiceData && (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-semibold">Invoice not found 😢</h2>
          <Link className="text-blue-600 underline mt-4 block" to="/">
            Go Back
          </Link>
        </div>
      )}

      {!loading && invoiceData && (
        <div className="p-8">
          <Link
            to="/"
            className="text-blue-600 underline mb-4 inline-block"
          >
            ← Back
          </Link>

          <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
            <PrintableInvoice
              client={invoiceData.client}
              invoice={invoiceData.invoice}
              items={invoiceData.items}
              subtotal={invoiceData.totals.subTotal}
              totalTax={invoiceData.totals.totalTax}
              totalFees={invoiceData.totals.totalFees}
              grandTotal={invoiceData.totals.grandTotal}
              formatCurrency={(v) =>
                `${
                  invoiceData.invoice.currency === "INR"
                    ? "₹"
                    : invoiceData.invoice.currency === "USD"
                    ? "$"
                    : "€"
                }${Number(v).toFixed(2)}`
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInvoice;
