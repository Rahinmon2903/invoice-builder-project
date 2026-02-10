import logo from "../assets/logo.png";

const PrintableInvoice = ({
  client,
  invoice,
  items,
  subtotal,
  totalTax,
  totalFees,
  grandTotal,
}) => {

  
  const currency =
    invoice.currency === "USD"
      ? "$"
      : invoice.currency === "EUR"
      ? "€"
      : "₹";

  const money = (v) => `${currency}${Number(v || 0).toFixed(2)}`;

  return (
    <div style={page}>
      {/* BRAND */}
      <div style={brandWrapper}>
        <img src={logo} alt="Logo" style={logoStyle} />

        <div style={brandText}>
          <div style={business}>Golden Era</div>
          <div style={service}>Professional Services</div>
        </div>
      </div>

      {/* HEADER */}
      <div style={invoiceHeader}>
        <div>
          <div style={label}>Bill To</div>
          <div>{client.name}</div>
          <div>{client.address}</div>
          <div>{client.email}</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={invoiceTitle}>INVOICE</div>
          <div style={small}>Invoice No: {invoice.invoiceNo}</div>
          <div style={small}>Issue date: {invoice.date}</div>
          <div style={small}>Due date: {invoice.dueDate}</div>
        </div>
      </div>

      {/* SUMMARY */}
      <div style={summary}>
        <div>
          <div style={summaryLabel}>Invoice No.</div>
          <div style={summaryValue}>{invoice.invoiceNo}</div>
        </div>

        <div>
          <div style={summaryLabel}>Issue date</div>
          <div style={summaryValue}>{invoice.date}</div>
        </div>

        <div>
          <div style={summaryLabel}>Due date</div>
          <div style={summaryValue}>{invoice.dueDate}</div>
        </div>

        <div style={summaryTotal}>
          <div>Total due</div>
          <div>{money(grandTotal)}</div>
        </div>
      </div>

      {/* ITEMS */}
      <table style={table}>
        <thead>
          <tr>
            <th style={thLeft}>Description</th>
            <th style={thCenter}>Qty</th>
            <th style={thRight}>Unit price</th>
            <th style={thRight}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td style={tdLeft}>{i.description}</td>
              <td style={tdCenter}>{i.qty}</td>
              <td style={tdRight}>{money(i.price)}</td>
              <td style={tdRight}>{money(i.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div style={totals}>
        <div>Subtotal</div>
        <div>{money(subtotal)}</div>

        <div>Tax</div>
        <div>{money(totalTax)}</div>

        <div>Fees</div>
        <div>{money(totalFees)}</div>

        <div style={grand}>
          <div>Total</div>
          <div>{money(grandTotal)}</div>
        </div>
      </div>

      {/* SIGNATURE */}
      <div style={footer}>
        <div style={signLine} />
        <div style={signName}>Rahin Mon S</div>
        <div style={signRole}>Authorized Signatory</div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const page = {
  width: "794px",
  padding: "44px",
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  color: "#111",
  background: "#fff",
};

const brandWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "32px",
};

const logoStyle = {
  height: "78px",
  width: "78px",
  objectFit: "contain",
};

const brandText = {
  marginTop: "6px",
  textAlign: "center",
};

const business = {
  fontSize: "26px",
  fontWeight: "700",
  letterSpacing: "0.4px",
};

const service = {
  fontSize: "12px",
  color: "#555",
  marginTop: "2px",
};

const invoiceHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "28px",
};

const invoiceTitle = {
  fontSize: "22px",
  fontWeight: "700",
  letterSpacing: "1px",
};

const small = {
  fontSize: "12px",
  color: "#555",
};

const label = {
  fontSize: "11px",
  fontWeight: "700",
  marginBottom: "6px",
};

const summary = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1.2fr",
  background: "#FFC857",
  padding: "16px 18px",
  marginBottom: "28px",
};

const summaryLabel = {
  fontSize: "11px",
};

const summaryValue = {
  fontSize: "16px",
  fontWeight: "700",
};

const summaryTotal = {
  background: "#333",
  color: "#fff",
  padding: "14px",
  textAlign: "right",
  fontSize: "16px",
  fontWeight: "700",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const thLeft = {
  textAlign: "left",
  borderBottom: "1px solid #000",
  padding: "10px",
};

const thCenter = {
  textAlign: "center",
  borderBottom: "1px solid #000",
};

const thRight = {
  textAlign: "right",
  borderBottom: "1px solid #000",
};

const tdLeft = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const tdCenter = {
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

const tdRight = {
  textAlign: "right",
  borderBottom: "1px solid #ddd",
};

const totals = {
  width: "42%",
  marginLeft: "auto",
  marginTop: "22px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  rowGap: "8px",
};

const grand = {
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "space-between",
  borderTop: "2px solid #000",
  paddingTop: "10px",
  fontSize: "16px",
  fontWeight: "700",
};

const footer = {
  marginTop: "50px",
  textAlign: "right",
};

const signLine = {
  width: "180px",
  borderTop: "1px solid #000",
  marginLeft: "auto",
  marginBottom: "6px",
};

const signName = {
  fontSize: "13px",
  fontWeight: "700",
};

const signRole = {
  fontSize: "11px",
  color: "#555",
};

export default PrintableInvoice;


