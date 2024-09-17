import React, { useState, useEffect } from 'react';
import './ResourcesPlaning.css';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const ResourcePlanningSystem = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [newResource, setNewResource] = useState({ id: 0, name: '', type: '', date: '', quantity: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initialResources = [
      { id: 1, name: 'Resource A', type: 'Type 1', date: '2024-08-20', quantity: 100 },
      { id: 2, name: 'Resource B', type: 'Type 2', date: '2024-08-21', quantity: 50 },
      { id: 3, name: 'Resource C', type: 'Type 3', date: '2024-08-22', quantity: 200 },
    ];
    setResources(initialResources);
    setFilteredResources(initialResources);
  }, []);

  useEffect(() => {
    const filtered = resources.filter(
      (resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.date.includes(searchQuery)
    );
    setFilteredResources(filtered);
  }, [searchQuery, resources]);

  const handleAddResource = () => {
    setIsAdding(true);
  };

  const handleSaveResource = () => {
    setResources([...resources, newResource]);
    setFilteredResources([...filteredResources, newResource]);
    setIsAdding(false);
    setNewResource({ id: 0, name: '', type: '', date: '', quantity: 0 });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewResource({ id: 0, name: '', type: '', date: '', quantity: 0 });
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
    setFilteredResources(filteredResources.filter((resource) => resource.id !== id));
  };

  return (
    <div>
      <Header/>
    <div className="container">
      <h1 className="title">Resource Planning System</h1>
      <div className="button-container">
        <button className="btn btn-primary" onClick={handleAddResource}>
          Add Resource
        </button>
      </div>
      {isAdding && (
        <div className="form-container">
          <h2 className="form-title">Add New Resource</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <input
                id="type"
                type="text"
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                id="date"
                type="date"
                value={newResource.date}
                onChange={(e) => setNewResource({ ...newResource, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                value={newResource.quantity}
                onChange={(e) => setNewResource({ ...newResource, quantity: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" type="button" onClick={handleSaveResource}>
                Save
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="table-container">
        <h2 className="table-title">Resources</h2>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name, type, or date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="resource-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.name}</td>
                <td>{resource.type}</td>
                <td>{resource.date}</td>
                <td>{resource.quantity}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteResource(resource.id)}>
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

export default ResourcePlanningSystem;
