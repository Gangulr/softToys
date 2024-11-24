import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashbord/Dashbord';
import MakeOrder from './components/makeorders/MakeOrders';
import OrderList from './components/orderlist/OrderList';
import Sidebar from './components/sidebar/SideBar';
import Header from './components/header/Header'; // Import the Header component
import Footer from './components/footer/Footer'; // Import the Footer component
import RegisterSupplier from './components/registerSupplier/RegisterSupplier';
import FinanceUserInterface from './components/financeInterface/FinanceUserInterface';
import SupplierList from './components/registerSupplier/SupplierList';

import './App.css';


function App() {
  return (
    <Router>
      
      <div className="app-container">
        
        {/* Header */}
        <Header />
          <Routes>
          <Route path="/" element={<FinanceUserInterface />} />
          </Routes>
        <div className="content-container">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="main-content">
            <Routes>
              
              <Route path="/dashbord" element={<Dashboard />} />
              <Route path="/make-order" element={<MakeOrder />} />
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/supplier" element={<RegisterSupplier />} />
              <Route path="/supplier-List" element={<SupplierList />} />
            </Routes>
          </div>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
