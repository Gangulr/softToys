// RetrieveOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateOrderBill from './updateorderbill'; // Make sure this is the correct component name
import './billoderret.css';

const RetrieveOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // State to manage the selected order for editing
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/billorder');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setMessage('Error fetching orders. Please try again.');
    }
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setModalOpen(true); // Open the modal when editing
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/billorder/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      setMessage('Order deleted successfully.');
    } catch (error) {
      console.error('Error deleting order:', error);
      setMessage('Error deleting order. Please try again.');
    }
  };

  const handleView = (orderId) => {
    console.log(`View order with ID: ${orderId}`);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
  };

  return (
    <div>
      <h2>All Orders</h2>
      {message && <div className="retrieve-orders__message">{message}</div>}
      <table className="retrieve-orders__table">
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.shopName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>
                <button onClick={() => handleView(order._id)}>View</button>
                <button onClick={() => handleEdit(order)}>Edit</button>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the update order bill modal */}
      {isModalOpen && (
        <UpdateOrderBill
          order={selectedOrder}
          onClose={() => setModalOpen(false)}
          onUpdate={handleUpdateOrder}
        />
      )}
    </div>
  );
};

export default RetrieveOrders;
