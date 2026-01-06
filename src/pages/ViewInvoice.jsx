import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PrintableInvoice from './PrintableInvoice';

const ViewInvoice = () => {
    const [invoiceData,setInvoiceData]=useState(null);
    const {id}=useParams();

    useEffect(()=>{
        const stored=JSON.parse(localStorage.getItem("Invoices") || "[]");
        const found=stored.find(it=> String(it.id) == String(id));

        setInvoiceData(found || null);

    },[id])
    if (!invoiceData) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold">Invoice not found 😢</h2>
        <Link className="text-blue-600 underline mt-4 block" to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
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
            `${invoiceData.invoice.currency === "INR" ? "₹" : "$"}${Number(v).toFixed(2)}`
          }
        />
      </div>
    </div>
  );
};

export default ViewInvoice;