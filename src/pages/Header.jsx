import React from 'react';

const Header = () => {
    return (
        <>
         {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r">
        <div className="p-5 border-b">
          <h1 className="font-bold text-xl">Invoice Builder</h1>
        </div>

        <nav className="p-4 space-y-2">
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded">
            Dashboard
          </button>
          <button className="w-full text-left py-2 px-4 bg-blue-100 text-blue-600 rounded">
            Invoices
          </button>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded">
            Clients
          </button>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded">
            Products
          </button>
        </nav>
      </aside>
            
        </>
    );
};

export default Header;