import React, { useState, useEffect } from 'react';
import './dashbord.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    completedOrders: 0,
    pendingOrders: 0,
    totalPayments: 0,
    completedPayments: 0,
    duePayments: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard-summary') 
      .then(response => response.json())
      .then(data => setDashboardData(data))
      .catch(error => console.error('Error fetching dashboard data:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1 className="dashboard-title">Supplier Manager Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">Completed Orders</h2>
            <p className="card-number">{dashboardData.completedOrders}</p>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Pending Orders</h2>
            <p className="card-number">{dashboardData.pendingOrders}</p>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Total Payments</h2>
            <p className="card-number">LKR{dashboardData.totalPayments}</p>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Completed Payments</h2>
            <p className="card-number">{dashboardData.completedPayments}</p>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Due Payments</h2>
            <p className="card-number">{dashboardData.duePayments}</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
