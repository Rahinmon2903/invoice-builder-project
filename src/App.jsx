import React from 'react';
import HomePage from '../pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateInvoice from '../pages/createInvoice';
import Header from '../pages/Header';


const App = () => {
  return (
    <>
    <BrowserRouter>
   
    <Routes>
      <Route path="/" element={  <HomePage/>}></Route>
      <Route path="/create-invoice" element={  <CreateInvoice/>}></Route>

    </Routes>
    
    
    </BrowserRouter>


    </>
  );
};

export default App;