import React, { useState } from "react";

const InvoiceForm = () => {
  const [state, setState] = useState({
    isOpen: false,
    currency: "₹",
    currentDate: "",
    invoiceNumber: 1,
    billTo: "",
    billToAddress: "",
    billToEmail: "",
    billFrom: "textion",
    billFromAddress: "Tamil Nadu , India",
    billFromEmail: "textion@gmail.com",
    notes: "",
  });

  const [items, setItems] = useState([
    {
      id: Date.now(),
      name: "",
      description: "",
      price: 1,
      quantity: 1,
    },
  ]);

  // Handle customer details
  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add new item row
  const AddRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        description: "",
        price: 1,
        quantity: 1,
      },
    ]);
  };

  // Update item row
  const updatefun = (id, field, value) => {
    setItems((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );
  };

  // Delete item row
  const handledelete = (id) => {
    setItems((prev) => prev.filter((ele) => ele.id !== id));
  };

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="font-semibold text-gray-800">
          Current Date: {new Date().toLocaleDateString()}
        </p>
        <p className="font-semibold text-gray-800">
          Invoice Number: {state.invoiceNumber}
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Customer Section */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-3">Customer Details:</h2>

          <div className="mb-3">
            <label className="block font-medium mb-1">Customer Name</label>
            <input
              type="text"
              name="billTo"
              value={state.billTo}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Customer Address</label>
            <input
              type="text"
              name="billToAddress"
              value={state.billToAddress}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Customer Email</label>
            <input
              type="email"
              name="billToEmail"
              value={state.billToEmail}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Bill From Section */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-3">Bill From:</h2>

          <div className="mb-3">
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={state.billFrom}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Company Email</label>
            <input
              type="text"
              value={state.billFromEmail}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium mb-1">Company Address</label>
            <input
              type="text"
              value={state.billFromAddress}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
        </div>

      </div>

      {/* Items Table – OUTSIDE GRID */}
      <div className="mt-10">
        <h2 className="font-semibold text-gray-700 mb-3">Items</h2>

        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Item</th>
              <th className="p-2">Description</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Total</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">

                <td className="p-2">
                  <input
                    value={item.name}
                    onChange={(e) =>
                      updatefun(item.id, "name", e.target.value)
                    }
                    className="border p-1 w-full"
                    placeholder="Item Name"
                  />
                </td>

                <td className="p-2">
                  <input
                    value={item.description}
                    onChange={(e) =>
                      updatefun(item.id, "description", e.target.value)
                    }
                    className="border p-1 w-full"
                    placeholder="Description"
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updatefun(item.id, "quantity", Number(e.target.value))
                    }
                    className="border p-1 w-20 text-center"
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updatefun(item.id, "price", Number(e.target.value))
                    }
                    className="border p-1 w-24 text-center"
                  />
                </td>

                <td className="p-2 font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => handledelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row */}
        <button
          type="button"
          onClick={AddRow}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

    </form>
  );
};

export default InvoiceForm;

