const PrintableInvoice = ({
  client,
  invoice,
  items,
  subtotal,
  totalTax,
  totalFees,
  grandTotal,
  formatCurrency
}) => {
  return (
    <div id="invoicePrint" className="p-10 bg-white text-gray-900 max-w-3xl mx-auto border shadow-lg rounded-lg">

      {/* Header */}
      <header className="flex justify-between items-start mb-10 border-b pb-5">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">INVOICE</h1>
          <p className="mt-2 text-gray-600 text-sm">#{invoice.invoiceNo}</p>
          <p className="text-gray-600 text-sm">Date: {invoice.date}</p>
          {invoice.dueDate && (
            <p className="text-gray-600 text-sm">Due: {invoice.dueDate}</p>
          )}
        </div>

        <div className="text-right">
          <p className="font-semibold text-lg text-gray-800">Bill To</p>
          <p className="text-gray-700">{client.name}</p>
          <p className="text-gray-600">{client.email}</p>
          <p className="text-gray-600">{client.mobile}</p>
          <p className="text-gray-600">{client.address}</p>
        </div>
      </header>

      {/* Items Table */}
      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="bg-gray-100 border border-gray-300">
            <th className="p-3 text-left font-semibold">Description</th>
            <th className="p-3 text-center font-semibold w-20">Qty</th>
            <th className="p-3 text-right font-semibold w-32">Rate</th>
            <th className="p-3 text-right font-semibold w-32">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-b border-gray-200">
              <td className="p-3">{it.description}</td>
              <td className="p-3 text-center">{it.qty}</td>
              <td className="p-3 text-right">{formatCurrency(it.price)}</td>
              <td className="p-3 text-right font-medium">
                {formatCurrency(it.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2 text-right">

          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Tax:</span>
            <span>{formatCurrency(totalTax)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Extra Fees:</span>
            <span>{formatCurrency(totalFees)}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm">
        Thank you for your business!
      </footer>

    </div>
  );
};

export default PrintableInvoice;
