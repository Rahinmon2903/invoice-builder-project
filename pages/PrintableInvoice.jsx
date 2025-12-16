
const PrintableInvoice = ({client, invoice, items, subtotal, totalTax, totalFees, grandTotal,formatCurrency}) => {
  return (
    <div id="invoicePrint" className="p-6 bg-white text-black max-w-3xl">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p>{invoice.invoiceNo}</p>
          <p>{invoice.date}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Bill To:</p>
          <p>{client.name}</p>
          <p>{client.email}</p>
          <p>{client.mobile}</p>
          <p>{client.address}</p>
        </div>
      </header>

      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Description</th><th>Qty</th><th>Rate</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td>{it.description}</td>
              <td>{it.qty}</td>
              <td>{formatCurrency(it.price)}</td>
              <td>{formatCurrency(it.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <div>Subtotal: {formatCurrency(subtotal)}</div>
        <div>Tax: {formatCurrency(totalTax)}</div>
        <div>Fees: {formatCurrency(totalFees)}</div>
        <div className="text-xl font-bold">Grand Total: {formatCurrency(grandTotal)}</div>
      </div>
    </div>
  );
};
 
export default PrintableInvoice;