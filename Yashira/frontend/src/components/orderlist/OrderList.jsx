import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; 
import './orderlist.css';
import ViewOrder from '../vieworder/ViewOrder'; 
import 'jspdf-autotable';
import logo from '../../assets/logo.png';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null); 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.reverse()); // Reverse the order here
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const filteredOrders = orders
    .filter(order => (filter ? order.status === filter : true))
    .filter(order =>
      search ? order.supplierName.toLowerCase().includes(search.toLowerCase()) : true
    );

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const generateReport = () => {
    const doc = new jsPDF();


    doc.addImage(logo, 'PNG', 14, 10, 50, 20); // Adjust the position and size as necessary

    // Add Title Next to Logo
    doc.setFontSize(18); // Set font size for the title
    doc.setFont("helvetica", "bold"); // Set font to bold
    doc.setTextColor(0, 51, 102); // Set color (pink to match soft toy theme)
    doc.text("Bear Works Lanka", 70, 20); // Position the title next to the logo

    
 // Draw Header Line
 doc.setDrawColor(0, 0, 0); // Set line color to black
 doc.line(14, 32, doc.internal.pageSize.width - 14, 32); // Draw line below the header


    doc.setFontSize(18);
    doc.text('Order List Summary', 100,45,{ align: 'center' }); 

    const tableColumnHeaders = ["Supplier", "Order Date", "Status"];
    const tableRows = filteredOrders.map(order => [
      order.supplierName,
      new Date(order.orderDate).toLocaleDateString(),
      order.status,
    ]);

    doc.autoTable({
      head: [tableColumnHeaders],
      body: tableRows,
      startY: 50, 
    });

     // Draw Footer Line
     const footerY = doc.internal.pageSize.height - 30; // Position for footer line
     doc.line(14, footerY, doc.internal.pageSize.width - 14, footerY); // Draw line above the footer
 
     // Add Footer
     doc.setFontSize(12); // Set font size for footer
     doc.setFont("helvetica", "normal"); // Set font to normal
     doc.setTextColor(0, 0, 0); // Set color to black
     const footerText = "Address: 123 Bear Lane, Colombo, Sri Lanka\nContact: +94 123 456 789"; // Sample footer text
     const footerLines = doc.splitTextToSize(footerText, doc.internal.pageSize.width - 28); // Split text to fit the page
 
     doc.text(footerLines, 14, footerY + 10); // Draw footer text below the footer line

    doc.save('order-list-summary.pdf');
  };

  return (
    <div className="order-list-container">
      {selectedOrderId ? (
        <ViewOrder orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
      ) : (
        <>
          <div className="filters">
            <input
              type="text"
              placeholder="Search by supplier"
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="filter-select"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="completed">completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>

            <button className="report-button" onClick={generateReport}>
              Generate Report
            </button>
          </div>

          <table className="order-table">
            <thead>
              <tr>
                <th className="table-header">Supplier</th>
                <th className="table-header">Order Date</th>
                <th className="table-header">Status</th>
                <th className="table-header">View Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order._id}>
                  <td className="table-cell">{order.supplierName}</td>
                  <td className="table-cell">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="table-cell">{order.status}</td>
                  <td className="table-cell">
                    <button
                      className="view-order-button"
                      onClick={() => handleViewOrder(order._id)} 
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderList;
