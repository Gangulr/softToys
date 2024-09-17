import React, { useState, useEffect } from 'react';
import './productionplaning.css';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const ProductionManagementSystem = () => {
  const [productions, setProductions] = useState([]);
  const [newProduction, setNewProduction] = useState({ id: 0, name: '', status: '', quantity: 0, productionDate: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initialProductions = [
      { id: 1, name: 'Product A', status: 'In Progress', quantity: 100, productionDate: '2024-08-01' },
      { id: 2, name: 'Product B', status: 'Done', quantity: 50, productionDate: '2024-08-05' },
      { id: 3, name: 'Product C', status: 'On Hold', quantity: 200, productionDate: '2024-08-10' },
    ];
    setProductions(initialProductions);
  }, []);

  const handleAddProduction = () => {
    setIsAdding(true);
  };

  const handleSaveProduction = () => {
    setProductions([...productions, { ...newProduction, id: productions.length + 1 }]);
    setIsAdding(false);
    setNewProduction({ id: 0, name: '', status: '', quantity: 0, productionDate: '' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewProduction({ id: 0, name: '', status: '', quantity: 0, productionDate: '' });
  };

  const handleDeleteProduction = (id) => {
    setProductions(productions.filter((production) => production.id !== id));
    setEditingId(null); // Reset editing ID after delete
  };

  const handleEditStatus = (id, currentStatus) => {
    setEditingId(id);
    setUpdatedStatus(currentStatus);
  };

  const handleSaveStatus = (id) => {
    setProductions(
      productions.map((production) =>
        production.id === id ? { ...production, status: updatedStatus } : production
      )
    );
    setEditingId(null);
    setUpdatedStatus('');
  };

  const filteredProductions = productions.filter((production) =>
    production.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    production.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div >
        <Header />
      <div className="production-management-container">
    
      <h1 className="title">Production Management System</h1>
      <div className="actions">
        <button
          className="add-production-button"
          onClick={handleAddProduction}
        >
          Add Production
        </button>
      </div>
      {isAdding && (
        <div className="form-container">
          <h2 className="form-title">Add New Production</h2>
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name:
              </label>
              <input
                className="form-input"
                id="name"
                type="text"
                value={newProduction.name}
                onChange={(e) => setNewProduction({ ...newProduction, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="status">
                Status:
              </label>
              <select
                className="form-select"
                id="status"
                value={newProduction.status}
                onChange={(e) => setNewProduction({ ...newProduction, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="quantity">
                Quantity:
              </label>
              <input
                className="form-input"
                id="quantity"
                type="number"
                value={newProduction.quantity}
                onChange={(e) => setNewProduction({ ...newProduction, quantity: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="productionDate">
                Production Date:
              </label>
              <input
                className="form-input"
                id="productionDate"
                type="date"
                value={newProduction.productionDate}
                onChange={(e) => setNewProduction({ ...newProduction, productionDate: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button
                className="save-button"
                type="button"
                onClick={handleSaveProduction}
              >
                Save
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="table-container">
        <h2 className="table-title">Productions</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or status..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="production-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Production Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductions.map((production) => (
              <tr key={production.id}>
                <td>{production.id}</td>
                <td>{production.name}</td>
                <td>
                  {editingId === production.id ? (
                    <div>
                      <select
                        className="form-select"
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                      <button
                        className="save-button"
                        onClick={() => handleSaveStatus(production.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      {production.status}
                    </div>
                  )}
                </td>
                <td>{production.quantity}</td>
                <td>{production.productionDate}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditStatus(production.id, production.status)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProduction(production.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      </div>
      <Footer />
    </div>
  );
};

export default ProductionManagementSystem;
