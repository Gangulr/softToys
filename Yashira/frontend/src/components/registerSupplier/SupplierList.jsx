import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Modal for pop-up
import './supplierlist.css';

Modal.setAppElement('#root'); // Accessibility

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [viewSupplier, setViewSupplier] = useState(null); // For viewing and updating specific supplier details
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data.suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Supplier deleted successfully.');
        fetchSuppliers(); // Refresh the supplier list
      } else {
        setMessage('Failed to delete supplier.');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const openModal = (supplier) => {
    setViewSupplier(supplier);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewSupplier(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/${viewSupplier._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(viewSupplier),
      });

      if (response.ok) {
        setMessage('Supplier updated successfully.');
        closeModal(); // Close modal after successful update
        fetchSuppliers(); // Refresh the supplier list
      } else {
        setMessage('Failed to update supplier.');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email' || name === 'phone') {
      setViewSupplier((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [name]: value },
      }));
    } else {
      setViewSupplier((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="supplier-list-container">
      <div className="supplier-list-table">
        <h2 className="title">Supplier List</h2>
        {message && <p className="message">{message}</p>}

        <table className="supplier-table">
          <thead>
            <tr>
              <th className="table-header">Supplier Name</th>
              <th className="table-header">Contact Person</th>
              <th className="table-header">Item Category</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td className="table-cell">{supplier.name}</td>
                <td className="table-cell">{supplier.companyName}</td>
                <td className="table-cell">{supplier.itemCategory}</td>
                <td className="table-cell">{supplier.contactInfo.phone}</td>
                <td className="table-cell">
                  <button className="view-order-button" onClick={() => openModal(supplier)}>View</button>
                  <button className="delete-button" onClick={() => handleDelete(supplier._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for viewing and updating supplier details */}
        {viewSupplier && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="supplier-modal"
            overlayClassName="supplier-modal-overlay"
          >
            <h3>Supplier Details</h3>
            <form onSubmit={handleUpdate} className="modal-form">
              <div className="form-group">
                <label>Supplier Name:</label>
                <input
                  type="text"
                  name="name"
                  value={viewSupplier.name}
                  onChange={handleInputChange}
                  placeholder="Supplier Name"
                />
              </div>
              <div className="form-group">
                <label>Contact Person:</label>
                <input
                  type="text"
                  name="companyName"
                  value={viewSupplier.companyName}
                  onChange={handleInputChange}
                  placeholder="Contact person"
                />
              </div>
              <div className="form-group">
                <label>Item Category:</label>
                <input
                  type="text"
                  name="itemCategory"
                  value={viewSupplier.itemCategory}
                  onChange={handleInputChange}
                  placeholder="Item Category"
                />
              </div>
              <div className="form-group">
                <label>Delivery Type:</label>
                <select
                  name="deliveryType"
                  value={viewSupplier.deliveryType}
                  onChange={handleInputChange}
                >
                  <option value="Delivery by Supplier">Delivery by Supplier</option>
                  <option value="Pickup by Us">Pickup by Us</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={viewSupplier.contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={viewSupplier.contactInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={viewSupplier.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>
              <button type="submit" className="update-button">Update Supplier</button>
            </form>
            <button onClick={closeModal} className="close-button">Close</button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SupplierList;
