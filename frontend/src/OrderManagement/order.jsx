import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css'; // Import the CSS file
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const initialOrder = {
  orderItems: [{ name: '', quantity: 0 }],
  status: '',
  shopName: '',
  orderDate: '',
};

const OrderCreation = () => {
  const [order, setOrder] = useState(initialOrder);
  const [orders, setOrders] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleStatusChange = (event) => {
    setOrder({ ...order, status: event.target.value });
  };

  const handleShopNameChange = (event) => {
    setOrder({ ...order, shopName: event.target.value });
  };

  const handleOrderDateChange = (event) => {
    setOrder({ ...order, orderDate: event.target.value });
  };

  const handleItemNameChange = (event, index) => {
    const newOrderItems = [...order.orderItems];
    newOrderItems[index].name = event.target.value;
    setOrder({ ...order, orderItems: newOrderItems });
  };

  const handleItemQuantityChange = (event, index) => {
    const newOrderItems = [...order.orderItems];
    newOrderItems[index].quantity = parseInt(event.target.value, 10);
    setOrder({ ...order, orderItems: newOrderItems });
  };

  const handleAddItem = () => {
    setOrder({
      ...order,
      orderItems: [...order.orderItems, { name: '', quantity: 0 }],
    });
  };

  const handleUpdateOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = order;
    setOrders(updatedOrders);
    setOrder(initialOrder);
    setEditIndex(null);
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  const calculateTotalQuantity = (orderItems) => {
    return orderItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      handleUpdateOrder(editIndex);
    } else {
      setOrders([...orders, order]);
      setOrder(initialOrder);
    }
  };

  const handleEdit = (index) => {
    setOrder(orders[index]);
    setEditIndex(index);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <div>
      <Header/>
    <div className="order-creation-container">
      {/* Side Button at the Top */}
      <button
        className="navigate-button"
        onClick={() => navigate('/another-page')} // Navigate to another page
      >
        View Orders
      </button>

      <h2 className="title">
        {editIndex !== null ? 'Edit Order' : 'Order Creation'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="shopName">
            Shop Name
          </label>
          <input
            className="form-input"
            id="shopName"
            type="text"
            value={order.shopName}
            onChange={handleShopNameChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="orderDate">
            Order Date
          </label>
          <input
            className="form-input"
            id="orderDate"
            type="date"
            value={order.orderDate}
            onChange={handleOrderDateChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="status">
            Order Status
          </label>
          <select
            className="form-select"
            id="status"
            value={order.status}
            onChange={handleStatusChange}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {order.orderItems.map((item, index) => (
          <div key={index} className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor={`itemName${index}`}>
                Item {index + 1} Name
              </label>
            </div>
            <input
              className="form-input"
              id={`itemName${index}`}
              type="text"
              value={item.name}
              onChange={(event) => handleItemNameChange(event, index)}
            />
            <div className="form-label-group mt-2">
              <label className="form-label" htmlFor={`itemQuantity${index}`}>
                Quantity
              </label>
            </div>
            <div className="form-label-group">
              <input
                className="form-input"
                id={`itemQuantity${index}`}
                type="number"
                value={item.quantity}
                onChange={(event) => handleItemQuantityChange(event, index)}
              />
            </div>
          </div>
        ))}
        <button
          className="add-item-button"
          type="button"
          onClick={handleAddItem}
        >
          Add Item
        </button>
        <div className="total-quantity-group mt-4">
          <label className="form-label" htmlFor="totalQuantity">
            Total Quantity
          </label>
          <input
            className="form-input"
            id="totalQuantity"
            type="number"
            value={calculateTotalQuantity(order.orderItems)}
            readOnly
          />
        </div>
        <button
          className="submit-button mt-4"
          type="submit"
        >
          {editIndex !== null ? 'Update Order' : 'Create Order'}
        </button>
      </form>

      <div className="search-group mt-8">
        <input
          className="form-input"
          type="text"
          placeholder="Search by Shop Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredOrders.length > 0 && (
        <div className="orders-list mt-8 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="orders-title text-xl font-bold mb-4">
            All Orders
          </h3>
          {filteredOrders.map((order, index) => (
            <div key={index} className="order-item mb-4 p-4 bg-white rounded shadow-sm">
              <div className="order-header flex justify-between items-center">
                <h4 className="order-title text-lg font-bold">
                  Order {index + 1}
                </h4>
                <button
                  className="view-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleViewOrder(order)}
                >
                  View
                </button>
              </div>
              <div className="order-details mt-4">
                <p className="order-detail text-sm text-gray-700">
                  Shop: {order.shopName}
                </p>
                <p className="order-detail text-sm text-gray-700">
                  Date: {order.orderDate}
                </p>
                <p className="order-detail text-sm text-gray-700">
                  Status: {order.status}
                </p>
                <p className="order-detail text-sm text-gray-700 font-bold mt-2">
                  Total Quantity: {calculateTotalQuantity(order.orderItems)}
                </p>
              </div>
              <div className="order-actions mt-4">
                <button
                  className="edit-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-2"
                  onClick={() => handleDeleteOrder(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white rounded p-4 w-3/4 md:w-1/2 lg:w-1/3 shadow-md">
            <h3 className="modal-title text-xl font-bold mb-4">
              Order Details
            </h3>
            <p className="modal-detail text-sm text-gray-700">
              Shop: {selectedOrder.shopName}
            </p>
            <p className="modal-detail text-sm text-gray-700">
              Date: {selectedOrder.orderDate}
            </p>
            <p className="modal-detail text-sm text-gray-700">
              Status: {selectedOrder.status}
            </p>
            <p className="modal-detail text-sm text-gray-700 font-bold mt-2">
              Total Quantity: {calculateTotalQuantity(selectedOrder.orderItems)}
            </p>
            <h5 className="modal-items-title text-md font-bold mb-2">
              Order Items:
            </h5>
            <ul>
              {selectedOrder.orderItems.map((item, index) => (
                <li key={index} className="modal-item text-sm text-gray-700">
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <button
              className="close-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div> 
  );
};

export default OrderCreation;
