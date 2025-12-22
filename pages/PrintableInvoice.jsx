const PrintableInvoice = ({
  client,
  invoice,
  items,
  subtotal,
  totalTax,
  totalFees,
  grandTotal,
}) => {
  return (
    <div
      style={{
        width: "794px", // A4 width
        padding: "28px",
        background: "#ffffff",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 1 }}>
            INVOICE
          </h1>
          <div style={{ marginTop: 6 }}>
            <strong>Invoice No:</strong> {invoice.invoiceNo}
          </div>
          <div>
            <strong>Date:</strong> {invoice.date}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "bold" }}>Bill To</div>
          <div>{client.name}</div>
          <div>{client.email}</div>
          <div>{client.mobile}</div>
        </div>
      </div>

      <hr style={{ margin: "18px 0" }} />

      {/* ITEMS TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 16,
        }}
      >
        <thead>
          <tr style={{ background: "#333", color: "#fff" }}>
            <th style={thLeft}>Item</th>
            <th style={thCenter}>Qty</th>
            <th style={thRight}>Rate</th>
            <th style={thRight}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td style={tdLeft}>{i.description}</td>
              <td style={tdCenter}>{i.qty}</td>
              <td style={tdRight}>₹{i.price}</td>
              <td style={tdRight}>₹{i.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: "38%" }}>
          <div style={row}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div style={row}>
            <span>Tax</span>
            <span>₹{totalTax}</span>
          </div>
          <div style={row}>
            <span>Fees</span>
            <span>₹{totalFees}</span>
          </div>

          <div
            style={{
              ...row,
              marginTop: 8,
              paddingTop: 8,
              borderTop: "2px solid #000",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 30, fontSize: 12 }}>
        <strong>Notes:</strong>
        <div>Thank you for your business.</div>
      </div>
    </div>
  );
};

/* ===== styles ===== */
const thLeft = {
  padding: 8,
  textAlign: "left",
};

const thCenter = {
  padding: 8,
  textAlign: "center",
};

const thRight = {
  padding: 8,
  textAlign: "right",
};

const tdLeft = {
  padding: 8,
  borderBottom: "1px solid #ddd",
};

const tdCenter = {
  padding: 8,
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

const tdRight = {
  padding: 8,
  textAlign: "right",
  borderBottom: "1px solid #ddd",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 6,
};

export default PrintableInvoice;
