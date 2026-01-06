import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import PrintableInvoice from "./PrintableInvoice";

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    date: "",
    dueDate: "",
    currency: "INR",
  });

  const [items, setItems] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [fees, setFees] = useState([]);

  /* ===== Load invoice ===== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Invoices") || "[]");
    const found = stored.find((it) => String(it.id) === String(id));

    if (!found) {
      alert("Invoice not found");
      navigate("/");
      return;
    }

    setClient(found.client || {});
    setInvoice(found.invoice || {});
    setItems(found.items || []);
    setTaxes(found.taxes || []);
    setFees(found.fees || []);
  }, [id, navigate]);

  /* ===== Totals ===== */
  const subTotal = useMemo(
    () => items.reduce((s, i) => s + Number(i.total || 0), 0),
    [items]
  );

  const totalTax = useMemo(() => {
    return taxes.reduce((sum, t) => {
      const pct = Number(t.percent || 0);
      return sum + (subTotal * pct) / 100;
    }, 0);
  }, [taxes, subTotal]);

  const totalFees = useMemo(
    () => fees.reduce((s, f) => s + Number(f.amount || 0), 0),
    [fees]
  );

  const grandTotal = subTotal + totalTax + totalFees;

  /* ===== Items ===== */
  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (String(item.id) === String(id)) {
          const updated = { ...item, [field]: value };
          updated.total =
            Number(updated.price || 0) * Number(updated.qty || 0);
          return updated;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), description: "", price: 0, qty: 1, total: 0 },
    ]);
  };

  const deleteItem = (id) => {
    setItems((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );
  };

  /* ===== Helpers ===== */
  const formatCurrency = (value, currency = invoice.currency) => {
    const symbol =
      currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";
    return `${symbol}${Number(value || 0).toFixed(2)}`;
  };

  /* ===== PDF ===== */
  const printRef = useRef(null);

  const exportPdf = () => {
    const el = printRef.current;
    if (!el) return;

    const originalStyle = el.style.cssText;

    el.style.position = "static";
    el.style.left = "0";
    el.style.display = "block";

    el.getBoundingClientRect();

    html2pdf()
      .from(el)
      .save(`${invoice.invoiceNo || "invoice"}.pdf`)
      .finally(() => {
        el.style.cssText = originalStyle;
      });
  };

  /* ===== Save ===== */
  const updateInvoice = (status) => {
    const stored = JSON.parse(localStorage.getItem("Invoices") || "[]");

    const updated = stored.map((inv) =>
      String(inv.id) === String(id)
        ? {
            ...inv,
            client,
            invoice,
            items,
            taxes,
            fees,
            status,
            totals: { subTotal, totalTax, totalFees, grandTotal },
          }
        : inv
    );

    localStorage.setItem("Invoices", JSON.stringify(updated));
    alert("Invoice updated");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Dashboard
          </button>

          <button
            onClick={exportPdf}
            className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
          >
            Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-14 space-y-16">
        <h2 className="text-3xl font-medium tracking-tight">
          Edit Invoice
        </h2>

        {/* Billing + Meta */}
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 bg-white border rounded-xl p-6">
            <h3 className="text-sm font-medium mb-4 text-gray-700">
              Billing details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={client.name || ""}
                onChange={(e) =>
                  setClient({ ...client, name: e.target.value })
                }
                placeholder="Client name"
                className="border rounded-md px-3 py-2 text-sm"
              />
              <input
                value={client.mobile || ""}
                onChange={(e) =>
                  setClient({ ...client, mobile: e.target.value })
                }
                placeholder="Mobile"
                className="border rounded-md px-3 py-2 text-sm"
              />
              <input
                value={client.email || ""}
                onChange={(e) =>
                  setClient({ ...client, email: e.target.value })
                }
                placeholder="Email"
                className="border rounded-md px-3 py-2 text-sm col-span-2"
              />
              <textarea
                value={client.address || ""}
                onChange={(e) =>
                  setClient({ ...client, address: e.target.value })
                }
                placeholder="Address"
                rows={3}
                className="border rounded-md px-3 py-2 text-sm col-span-2"
              />
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 space-y-4">
            {[
              ["Invoice number", "invoiceNo"],
              ["Creation date", "date"],
              ["Due date", "dueDate"],
            ].map(([label, key]) => (
              <div key={key}>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <input
                  type={key.includes("date") ? "date" : "text"}
                  value={invoice[key] || ""}
                  onChange={(e) =>
                    setInvoice({ ...invoice, [key]: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
            ))}

            <select
              value={invoice.currency}
              onChange={(e) =>
                setInvoice({ ...invoice, currency: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-sm font-medium mb-5 text-gray-700">
            Items
          </h3>

          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-3 text-left">Description</th>
                <th className="py-3 w-28 text-right">Price</th>
                <th className="py-3 w-20 text-right">Qty</th>
                <th className="py-3 w-36 text-right">Total</th>
                <th className="w-8" />
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="group border-b last:border-none">
                  <td className="py-3 pr-6">
                    <input
                      value={item.description || ""}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="w-full bg-transparent border-b border-gray-200 px-1 py-1 text-sm focus:outline-none focus:border-black"
                    />
                  </td>

                  <td className="py-3 text-right bg-gray-50">
                    <input
                      value={item.price || 0}
                      onChange={(e) =>
                        updateItem(item.id, "price", e.target.value)
                      }
                      className="w-24 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-right"
                    />
                  </td>

                  <td className="py-3 text-right bg-gray-50">
                    <input
                      value={item.qty || 0}
                      onChange={(e) =>
                        updateItem(item.id, "qty", e.target.value)
                      }
                      className="w-16 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-right"
                    />
                  </td>

                  <td className="py-3 text-right font-medium">
                    {formatCurrency(item.total)}
                  </td>

                  <td
                    onClick={() => deleteItem(item.id)}
                    className="py-3 text-gray-300 hover:text-red-500 cursor-pointer text-center"
                  >
                    ×
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addItem} className="mt-5 text-sm font-medium">
            + Add item
          </button>
        </div>

        {/* ===== Taxes ===== */}
        <div className="bg-white border rounded-xl p-6 max-w-sm ml-auto">
          <h3 className="text-sm font-medium mb-4 text-gray-700">Taxes</h3>

          {taxes.map((tax) => (
            <div key={tax.id} className="flex gap-2 mb-3">
              <input
                placeholder="Tax"
                value={tax.name || ""}
                onChange={(e) =>
                  setTaxes((prev) =>
                    prev.map((t) =>
                      t.id === tax.id ? { ...t, name: e.target.value } : t
                    )
                  )
                }
                className="border rounded-md px-2 py-1 text-sm flex-1"
              />

              <input
                type="number"
                placeholder="%"
                value={tax.percent || ""}
                onChange={(e) =>
                  setTaxes((prev) =>
                    prev.map((t) =>
                      t.id === tax.id
                        ? { ...t, percent: e.target.value }
                        : t
                    )
                  )
                }
                className="border rounded-md px-2 py-1 text-sm w-20 text-right"
              />

              <button
                onClick={() =>
                  setTaxes((prev) =>
                    prev.filter((t) => t.id !== tax.id)
                  )
                }
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              setTaxes((prev) => [
                ...prev,
                { id: Date.now(), name: "", percent: 0 },
              ])
            }
            className="text-sm font-medium"
          >
            + Add tax
          </button>
        </div>

        {/* ===== Fees ===== */}
        <div className="bg-white border rounded-xl p-6 max-w-sm ml-auto">
          <h3 className="text-sm font-medium mb-4 text-gray-700">Fees</h3>

          {fees.map((fee) => (
            <div key={fee.id} className="flex gap-2 mb-3">
              <input
                placeholder="Fee"
                value={fee.name || ""}
                onChange={(e) =>
                  setFees((prev) =>
                    prev.map((f) =>
                      f.id === fee.id ? { ...f, name: e.target.value } : f
                    )
                  )
                }
                className="border rounded-md px-2 py-1 text-sm flex-1"
              />

              <input
                type="number"
                placeholder="₹"
                value={fee.amount || ""}
                onChange={(e) =>
                  setFees((prev) =>
                    prev.map((f) =>
                      f.id === fee.id
                        ? { ...f, amount: e.target.value }
                        : f
                    )
                  )
                }
                className="border rounded-md px-2 py-1 text-sm w-24 text-right"
              />

              <button
                onClick={() =>
                  setFees((prev) =>
                    prev.filter((f) => f.id !== fee.id)
                  )
                }
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              setFees((prev) => [
                ...prev,
                { id: Date.now(), name: "", amount: 0 },
              ])
            }
            className="text-sm font-medium"
          >
            + Add fee
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm bg-white border rounded-xl p-6 space-y-4">
            {[
              ["Subtotal", subTotal],
              ["Tax", totalTax],
              ["Fees", totalFees],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600">{label}</span>
                <span className="font-medium">
                  {formatCurrency(val)}
                </span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => updateInvoice("Draft")}
            className="px-5 py-2.5 text-sm border rounded-md"
          >
            Save draft
          </button>
          <button
            onClick={() => updateInvoice("Unpaid")}
            className="px-5 py-2.5 text-sm border rounded-md text-red-600 border-red-200"
          >
            Save unpaid
          </button>
          <button
            onClick={() => updateInvoice("Paid")}
            className="px-5 py-2.5 text-sm bg-black text-white rounded-md"
          >
            Save paid
          </button>
        </div>

        {/* Printable */}
        <div
          ref={printRef}
          style={{
            position: "absolute",
            left: "-9999px",
            width: "794px",
            background: "#fff",
          }}
        >
          <PrintableInvoice
            client={client}
            invoice={invoice}
            items={items}
            subtotal={subTotal}
            totalTax={totalTax}
            totalFees={totalFees}
            grandTotal={grandTotal}
          />
        </div>
      </main>
    </div>
  );
};

export default EditInvoice;
