import React from 'react';
import HomePage from '../pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateInvoice from '../pages/createInvoice';

import ViewInvoice from '../pages/ViewInvoice';
import EditInvoice from '../pages/EditInvoice';


const App = () => {
  return (
    <>
    <BrowserRouter>
   
    <Routes>
      <Route path="/" element={  <HomePage/>}></Route>
      <Route path="/create-invoice" element={  <CreateInvoice/>}></Route>
      <Route path="/view/:id" element={  <ViewInvoice/>}></Route>
      <Route path="/edit/:id" element={  <EditInvoice/>}></Route>

    </Routes>
    
    
    </BrowserRouter>


    </>
  );
};

export default App;