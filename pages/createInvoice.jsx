import React from "react";

const CreateInvoice = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold tracking-tight">Invoice Builder</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-100">
            Dashboard
          </button>
          <button className="w-full text-left py-2 px-4 bg-blue-100 text-blue-600 rounded font-medium">
            Invoices
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-100">
            Clients
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-100">
            Products
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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
              <input className="border rounded p-2" placeholder="Client Name" />
              <input
                className="border rounded p-2"
                placeholder="Client Mobile"
              />
              <input
                className="border rounded p-2 col-span-2"
                placeholder="Client Email"
              />
              <textarea
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
                className="w-full border rounded p-2"
                placeholder="INV-001"
              />
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Creation Date</p>
              <input type="date" className="w-full border rounded p-2" />
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Due Date</p>
              <input type="date" className="w-full border rounded p-2" />
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Currency</p>
              <select className="w-full border rounded p-2">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
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
              <tr className="border-b">
                <td className="py-3 px-3">
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Item description"
                  />
                </td>

                <td className="px-3">
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="0"
                  />
                </td>

                <td className="px-3">
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="0"
                  />
                </td>

                <td className="px-3 text-gray-700 font-medium">₹0.00</td>

                <td className="px-3 text-red-500 cursor-pointer text-xl">🗑️</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
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
              <p>₹0.00</p>
            </div>

            <hr />

            <div className="flex gap-3">
              <input
                className="flex-1 border p-2 rounded"
                placeholder="Tax Type"
              />
              <input className="w-24 border p-2 rounded" placeholder="0%" />
            </div>

            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
              + Add Tax
            </button>

            <div className="flex gap-3">
              <input
                className="flex-1 border p-2 rounded"
                placeholder="Extra Fee"
              />
              <input className="w-24 border p-2 rounded" placeholder="0" />
            </div>

            <button className="px-3 py-1 bg-green-600 text-white rounded-md">
              + Add Fee
            </button>

            <hr />

            <div className="flex justify-between text-xl font-semibold">
              <p>Total</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-3 mt-10">
          <button className="px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Save as Draft
          </button>

          <button className="px-5 py-2.5 rounded-md bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition">
            Save as Unpaid
          </button>

          <button className="px-5 py-2.5 rounded-md bg-green-600 text-white shadow-sm hover:bg-green-700 transition">
            Save as Paid
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateInvoice;
