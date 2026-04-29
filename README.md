# 🧾 Invoice Management App (React)

A clean and modern **Invoice Management System** built with **React**.  
Create, edit, view, and export professional invoices as PDFs — all stored locally in the browser.

---

## ✨ Features

- 📄 Create professional invoices  
- ✏️ Edit existing invoices  
- 👀 View invoice details  
- 📥 Export invoices as PDF  
- 🧮 Automatic calculations (Subtotal, Tax, Fees, Grand Total)  
- 💾 Persistent storage using **LocalStorage**  
- 🎨 Clean, printable invoice layout (A4 friendly)  
- ⚡ Fast development with **Vite**

---

## 🛠️ Tech Stack

- React  
- React Router  
- Vite  
- html2pdf.js  
- Tailwind CSS  
- LocalStorage (Browser)

---

## 📂 Project Structure

```text
src/
├── pages/
│   ├── HomePage.jsx
│   ├── CreateInvoice.jsx
│   ├── EditInvoice.jsx
│   └── ViewInvoice.jsx
├── components/
│   └── PrintableInvoice.jsx
├── App.jsx
└── main.jsx

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/Rahinmon2903/invoice-builder-project

2️⃣ Navigate to the Project Folder
cd invoice-builder-project

3️⃣ Install Dependencies
npm install

4️⃣ Start Development Server
npm run dev


The app will run at:

http://localhost:5173

📦 Build for Production
npm run build

📄 Invoice Workflow

Go to Dashboard

Click New Invoice

Fill client details, items, tax, and fees

Save invoice (Draft / Paid / Unpaid)

View or Edit anytime

Export invoice as PDF

⚠️ Notes

All data is stored in LocalStorage

Clearing browser data will remove invoices

Designed for demo / academic / personal projects

📸 UI Preview

Dashboard overview

Professional invoice layout

A4-optimized printable invoice

Brand-ready design

👨‍💻 Author

Rahin Mon S

📜 License

This project is for educational and personal use.
