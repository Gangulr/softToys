import React, { useState, useEffect } from 'react';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import the autoTable plugin for jsPDF
import './leaveret.css';

const LeaveRetrieve = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLeave, setEditingLeave] = useState(null); // For editing leave request
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    startDate: '',
    endDate: '',
    reason: '',
    type: ''
  });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('/api/Leave');
        setLeaves(response.data);
        setFilteredLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Failed to fetch leave requests');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterLeaves(searchTerm, typeFilter);
  };

  const handleTypeFilter = (e) => {
    const type = e.target.value;
    setTypeFilter(type);
    filterLeaves(searchTerm, type);
  };

  const handleReset = () => {
    setSearchTerm('');
    setTypeFilter('');
    setFilteredLeaves(leaves);
  };

  const filterLeaves = (searchTerm, type) => {
    const filtered = leaves.filter((leave) =>
      (leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.empId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (type ? leave.type === type : true)
    );
    setFilteredLeaves(filtered);
  };

  const handleEdit = (leave) => {
    setEditingLeave(leave._id);
    setFormData({
      empId: leave.empId,
      name: leave.name,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      type: leave.type
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/Leave/${editingLeave}`, formData);
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave._id === editingLeave ? { ...leave, ...formData } : leave
        )
      );
      setFilteredLeaves((prevFilteredLeaves) =>
        prevFilteredLeaves.map((leave) =>
          leave._id === editingLeave ? { ...leave, ...formData } : leave
        )
      );
      setEditingLeave(null);
    } catch (error) {
      console.error('Error updating leave request:', error);
      setError('Failed to update leave request');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Leave/${id}`);
      setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave._id !== id));
      setFilteredLeaves((prevFilteredLeaves) =>
        prevFilteredLeaves.filter((leave) => leave._id !== id)
      );
    } catch (error) {
      console.error('Error deleting leave request:', error);
      setError('Failed to delete leave request');
    }
  };

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Leave Requests List', 20, 10);
    
    // Add table headers
    const headers = [['ID', 'Employee ID', 'Name', 'Start Date', 'End Date', 'Reason', 'Type']];
    
    // Map filtered leaves to table data
    const data = filteredLeaves.map(leave => [
      leave._id,
      leave.empId,
      leave.name,
      new Date(leave.startDate).toLocaleDateString(),
      new Date(leave.endDate).toLocaleDateString(),
      leave.reason,
      leave.type
    ]);

    // Generate table in PDF
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20
    });
    
    // Save the PDF and download
    doc.save('Leave_Requests_List.pdf');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4">Leave Requests</h1>
        <div className="flex justify-between mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or employee ID"
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700 border rounded"
          />
          <select
            value={typeFilter}
            onChange={handleTypeFilter}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700 border rounded"
          >
            <option value="">All Types</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
          {/* Button to generate and download PDF */}
          <button
            onClick={generatePDF}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Download PDF
          </button>
        </div>

        {/* Editing Form */}
{editingLeave && (
  <form onSubmit={handleFormSubmit} className="mb-4">
    <h2 className="text-2xl font-bold mb-2">Edit Leave Request</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label htmlFor="empId" className="block mb-1">Employee ID</label>
        <input
          type="text"
          id="empId"
          name="empId"
          value={formData.empId}
          onChange={handleFormChange}
          placeholder="Employee ID"
          className="p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Name"
          className="p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="startDate" className="block mb-1">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleFormChange}
          className="p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block mb-1">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleFormChange}
          className="p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="reason" className="block mb-1">Reason</label>
        <input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleFormChange}
          placeholder="Reason"
          className="p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="type" className="block mb-1">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleFormChange}
          className="p-2 border rounded"
        >
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
        </select>
      </div>
    </div>
    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Save Changes
    </button>
    <button onClick={() => setEditingLeave(null)} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      Cancel
    </button>
  </form>
)}


        {/* Leave Requests Table */}
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Employee ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave._id}>
                <td className="border px-4 py-2">{leave._id}</td>
                <td className="border px-4 py-2">{leave.empId}</td>
                <td className="border px-4 py-2">{leave.name}</td>
                <td className="border px-4 py-2">{leave.startDate}</td>
                <td className="border px-4 py-2">{leave.endDate}</td>
                <td className="border px-4 py-2">{leave.reason}</td>
                <td className="border px-4 py-2">{leave.type}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(leave)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(leave._id)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default LeaveRetrieve;
