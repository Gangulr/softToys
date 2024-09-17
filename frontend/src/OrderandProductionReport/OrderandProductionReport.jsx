import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend } from 'recharts';
import './orderandproductionreport.css';// Correct import
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
const data = [
  { name: 'Jan', orders: 100, production: 50 },
  { name: 'Feb', orders: 120, production: 60 },
  { name: 'Mar', orders: 140, production: 70 },
  { name: 'Apr', orders: 160, production: 80 },
  { name: 'May', orders: 180, production: 90 },
  { name: 'Jun', orders: 200, production: 100 },
];

const OrderAndProductionReport = () => {
  const [orders, setOrders] = useState(data);
  const [production, setProduction] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders =>
        prevOrders.map(order => ({
          ...order,
          orders: Math.floor(Math.random() * 200) + 1,
        }))
      );
      setProduction(prevProduction =>
        prevProduction.map(production => ({
          ...production,
          production: Math.floor(Math.random() * 100) + 1,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
   <div> 
    <Header/>
    <div className="report-container">
        
      <h1 className="report-title">Order and Production Management Report</h1>
      <div className="charts-container">
        <div className="chart-wrapper">
          <LineChart width={400} height={250} data={orders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
          <h2 className="chart-title">Orders</h2>
        </div>
        <div className="chart-wrapper">
          <LineChart width={400} height={250} data={production}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="production" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
          <h2 className="chart-title">Production</h2>
        </div>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Orders</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.orders}</td>
              <td>{production[index]?.production}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Footer/>
    </div>
  );
};

export default OrderAndProductionReport;
