import React, { useMemo, useRef, useState } from "react";

import html2pdf from "html2pdf.js";

import PrintableInvoice from "./printableInvoice";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [client, setClient] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    invoiceNo: "INV-001",
    date: new Date().toISOString().slice(0, 10),
    dueDate: "",
    currency: "INR",
  });

  const [items, setItems] = useState([
    { id: Date.now(), description: "", price: 0, qty: 1, total: 0 },
  ]);

  const [taxes, setTaxes] = useState([]);
  const [fees, setFees] = useState([]);

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id == id) {
          const updated = { ...item, [field]: value };
          updated.total = Number(updated.price || 0) * Number(updated.qty || 0);
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
    setItems((prev) => prev.filter((item) => item.id != id));
  };

  const subTotal = useMemo(() => {
    return items.reduce((ac, c) => ac + (Number(c.total) || 0), 0);
  }, [items]);

  const totalTax = useMemo(() => {
    return taxes.reduce(
      (ac, c) => ac + subTotal * (Number(c.percent) / 100 || 0),
      0
    );
  }, [taxes, subTotal]);

  const totalFees = useMemo(() => {
    return fees.reduce((ac, c) => ac + (Number(c.amount) || 0), 0);
  }, [fees]);

  const grandTotal = subTotal + totalTax + totalFees;

  const formatCurrency = (value, currency = invoice.currency) => {
    const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";

    return `${symbol}${Number(value || 0).toFixed(2)}`;
  };

  const addTax = () => {
    setTaxes((prev) => [...prev, { id: Date.now(), name: "GST", percent: 18 }]);
  };
  const updateTax = (id, field, value) => {
    setTaxes((prev) =>
      prev.map((it) => (it.id == id ? { ...it, [field]: value } : it))
    );
  };

  const deleteTax = (id) => {
    setTaxes((prev) => prev.filter((t) => t.id != id));
  };

  const addFees = () => {
    setFees((prev) => [
      ...prev,
      { id: Date.now(), name: "extra fees", amount: 0 },
    ]);
  };
  const updateFees = (id, field, value) => {
    setFees((prev) =>
      prev.map((it) => (it.id == id ? { ...it, [field]: value } : it))
    );
  };

  const deleteFees = (id) => {
    setFees((prev) => prev.filter((t) => t.id != id));
  };

  const printRef = useRef();

 const exportPdf = () => {
  if (!printRef.current) return;

  html2pdf()
    .from(printRef.current)
    .save(`${invoice.invoiceNo || "invoice"}.pdf`);
};

  const saveInvoice = (status) => {
    const stored = JSON.parse(localStorage.getItem("Invoices") || "[]");
    const payload = {
      id: Date.now(),
      client,
      invoice,
      items,
      taxes,
      fees,
      status,
      totals: { subTotal, totalTax, totalFees, grandTotal },
    };
    localStorage.setItem("Invoices", JSON.stringify([payload, ...stored]));
    alert("Invoice saved!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold tracking-tight">Invoice Builder</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button className="w-full text-left py-2 px-4 bg-blue-100 text-blue-600 rounded font-medium">
            Invoices
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-800 text-xl">
              ←
            </button>
            <h2 className="text-3xl font-semibold tracking-tight">
              New Invoice
            </h2>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              View Mode
            </button>
            <button
              onClick={exportPdf}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* BANNER */}
        <div className="rounded-xl overflow-hidden shadow mb-10 h-48">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-3 gap-6">
          {/* BILLING CARD */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Billing To</h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                className="border rounded p-2"
                placeholder="Client Name"
              />
              <input
                name="mobile"
                value={client.mobile}
                onChange={(e) =>
                  setClient({ ...client, mobile: e.target.value })
                }
                className="border rounded p-2"
                placeholder="Client Mobile"
              />
              <input
                name="email"
                value={client.email}
                onChange={(e) =>
                  setClient({ ...client, email: e.target.value })
                }
                className="border rounded p-2 col-span-2"
                placeholder="Client Email"
              />
              <textarea
                name="address"
                value={client.address}
                onChange={(e) =>
                  setClient({ ...client, address: e.target.value })
                }
                className="border rounded p-2 col-span-2"
                placeholder="Client Address"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* INVOICE DETAILS CARD */}
          <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Invoice Number</p>
              <input
                name="invoiceNo"
                value={invoice.invoiceNo}
                onChange={(e) =>
                  setInvoice({ ...invoice, invoiceNo: e.target.value })
                }
                className="w-full border rounded p-2"
                placeholder="INV-001"
              />
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Creation Date</p>
              <input
                name="date"
                value={invoice.date}
                onChange={(e) =>
                  setInvoice({ ...invoice, date: e.target.value })
                }
                type="date"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Due Date</p>
              <input
                name="dueDate"
                value={invoice.dueDate}
                onChange={(e) =>
                  setInvoice({ ...invoice, dueDate: e.target.value })
                }
                type="date"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Currency</p>

              <select
                className="w-full border rounded p-2"
                name="currency"
                value={invoice.currency}
                onChange={(e) =>
                  setInvoice({ ...invoice, currency: e.target.value })
                }
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mt-10">
          <h3 className="text-lg font-semibold mb-4">Items</h3>

          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3 w-32">Price</th>
                <th className="py-2 px-3 w-32">Qty</th>
                <th className="py-2 px-3 w-32">Total</th>
                <th className="py-2 px-3 w-10"></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-3">
                    <input
                      name="description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                      placeholder="Item description"
                    />
                  </td>

                  <td className="px-3">
                    <input
                      name="price"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, "price", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                      placeholder="0"
                    />
                  </td>

                  <td className="px-3">
                    <input
                      name="qty"
                      value={item.qty}
                      onChange={(e) =>
                        updateItem(item.id, "qty", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                      placeholder="0"
                    />
                  </td>

                  <td className="px-3 text-gray-700 font-medium">
                    {item.total}
                  </td>

                  <td
                    onClick={() => deleteItem(item.id)}
                    className="px-3 text-red-500 cursor-pointer text-xl"
                  >
                    🗑️
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-4">
            <button
              onClick={addItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              + Add Product
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md">
              + Add Existing Product
            </button>
          </div>
        </div>

        {/* TOTALS CARD */}
        <div className="flex justify-end mt-10">
          <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm border space-y-4">
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p>{formatCurrency(subTotal)}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Total Tax</p>
              <p>{formatCurrency(totalTax)}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Total Fees</p>
              <p>{formatCurrency(totalFees)}</p>
            </div>

            <hr />

            {taxes.map((tax) => (
              <div key={tax.id} className="flex items-center gap-3">
                <input
                  className="flex-1 border p-2 rounded"
                  value={tax.name}
                  onChange={(e) => updateTax(tax.id, "name", e.target.value)}
                />

                <input
                  className="w-24 border p-2 rounded"
                  value={tax.percent}
                  onChange={(e) =>
                    updateTax(tax.id, "percent", Number(e.target.value))
                  }
                />

                <button
                  onClick={() => deleteTax(tax.id)}
                  className="text-red-500 text-xl"
                >
                  🗑️
                </button>
              </div>
            ))}

            <button
              onClick={addTax}
              className="px-3 py-1 bg-blue-600 text-white rounded-md"
            >
              + Add Tax
            </button>

            {fees.map((fee) => (
              <div key={fee.id} className="flex items-center gap-3">
                <input
                  className="flex-1 border p-2 rounded"
                  value={fee.name}
                  onChange={(e) => updateFees(fee.id, "name", e.target.value)}
                />

                <input
                  className="w-24 border p-2 rounded"
                  value={fee.amount}
                  onChange={(e) =>
                    updateFees(fee.id, "amount", Number(e.target.value))
                  }
                />

                <button
                  onClick={() => deleteFees(fee.id)}
                  className="text-red-500 text-xl"
                >
                  🗑️
                </button>
              </div>
            ))}

            <button
              onClick={addFees}
              className="px-3 py-1 bg-green-600 text-white rounded-md"
            >
              + Add Fee
            </button>

            <hr />

            <div className="flex justify-between text-xl font-semibold">
              <p>Total</p>
              <p>{formatCurrency(grandTotal)}</p>
            </div>
          </div>
        </div>
        <div
          ref={printRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "794px",
            background: "#ffffff",
            color: "#000000",
            fontFamily: "Arial",
            all: "initial",
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
            formatCurrency={formatCurrency}
          />
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-3 mt-10">
          <button
            onClick={() => saveInvoice("Draft")}
            className="px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Save as Draft
          </button>

          <button
            onClick={() => saveInvoice("Unpaid")}
            className="px-5 py-2.5 rounded-md bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition"
          >
            Save as Unpaid
          </button>

          <button
            onClick={() => saveInvoice("Paid")}
            className="px-5 py-2.5 rounded-md bg-green-600 text-white shadow-sm hover:bg-green-700 transition"
          >
            Save as Paid
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateInvoice;
