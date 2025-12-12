import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-5 flex items-center gap-3 border-b">
          <img
            src="https://via.placeholder.com/40"
            alt=""
            className="rounded-md"
          />
          <h1 className="font-semibold text-xl tracking-tight">
            Invoice Builder
          </h1>
        </div>

        <nav className="mt-4 flex-1">
  <ul className="space-y-1">

    {/* Dashboard */}
    <li>
      <button
        className="w-full text-left py-2.5 px-4 rounded-md
                   hover:bg-blue-600 hover:text-white
                   bg-blue-50 text-blue-600 font-medium"
      >
        Dashboard
      </button>
    </li>

    {/* Invoices */}
    <li>
      <Link
        to="/create-invoice"
        className="w-full text-left py-2.5 px-4 rounded-md
                   hover:bg-blue-600 hover:text-white
                   text-gray-700 block"
      >
        Invoices
      </Link>
    </li>

  </ul>
</nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          <Link to="/create-invoice" className="px-6 py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            + Add Invoice
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm font-medium">Total Amount</p>
            <p className="text-2xl font-semibold mt-1">₹3,148.64</p>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm font-medium">Total Paid</p>
            <p className="text-2xl font-semibold mt-1">₹3,148.64</p>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm font-medium">Total Unpaid</p>
            <p className="text-2xl font-semibold mt-1">₹0</p>
          </div>
        </div>

        {/* Invoices Table */}
        <section className="bg-white p-6 rounded-lg border shadow-sm mt-10">
          <h3 className="text-xl font-semibold mb-5">Invoices</h3>

          <table className="w-full text-left text-sm border-separate border-spacing-y-1">
            <thead>
              <tr className="text-gray-600">
                <th className="py-2 px-2">Invoice Name</th>
                <th className="py-2 px-2">Client Name</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-gray-50 hover:bg-gray-100 transition rounded-lg">
                <td className="py-3 px-2 rounded-l-lg"></td>
                <td className="px-2"></td>
                <td className="px-2 text-green-600 font-medium"></td>
                <td className="px-2 font-semibold"></td>
                <td className="px-2 rounded-r-lg"></td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
};

export default HomePage;
