import React, { useState, useEffect } from 'react';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import backgroundImage from '../image/BR.png'; // Import the background image
import logo from '../image/logo.png';

const LeaveRetrieve = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLeave, setEditingLeave] = useState(null);
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
      // Ensure empId is not modified by keeping the original empId in the formData
      const updatedData = { ...formData };
      delete updatedData.empId; // Ensure empId is not modified

      await axios.put(`/api/Leave/${editingLeave}`, updatedData);
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

 


const generatePDF = () => {
  const doc = new jsPDF();

  // Fetch and add the logo
  const addLogo = (img) => {
    if (img) {
      doc.addImage(img, 'PNG', 14, 10, 50, 20); // Adjust the position and size as necessary
    }
  };

  // Generate the rest of the PDF content
  const generatePDFContent = (img) => {
    addLogo(img); // Add logo if available

    // Add Title Next to Logo
    doc.setFontSize(18); // Set font size for the title
    doc.setFont('helvetica', 'bold'); // Set font to bold
    doc.setTextColor(0, 51, 102); // Set color
    doc.text('Bear Works Lanka', 70, 20); // Position the title next to the logo

    // Draw Header Line
    doc.setDrawColor(0, 0, 0); // Set line color to black
    doc.line(14, 32, doc.internal.pageSize.width - 14, 32); // Draw line below the header

    // Reset font for the report title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14); // Set font size for report title
    doc.setTextColor(0, 0, 0); // Set color to black
    doc.text('Leave Requests Report', 14, 50); // Title of the report

    // Prepare Table Headers
    const headers = [['Employee ID', 'Name', 'Start Date', 'End Date', 'Reason', 'Type']];

    // Prepare the body for the table
    const data = filteredLeaves.map((leave) => [
      leave.empId,
      leave.name,
      new Date(leave.startDate).toLocaleDateString(),
      new Date(leave.endDate).toLocaleDateString(),
      leave.reason,
      leave.type,
    ]);

    // Add Table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 60, // Adjust the starting Y position after the title
    });

    // Draw Footer Line
    const footerY = doc.internal.pageSize.height - 30; // Position for footer line
    doc.line(14, footerY, doc.internal.pageSize.width - 14, footerY); // Draw line above the footer

    // Add Footer
    doc.setFontSize(12); // Set font size for footer
    doc.setFont('helvetica', 'normal'); // Set font to normal
    doc.setTextColor(0, 0, 0); // Set color to black
    const footerText = '15 Schofield Pl, Colombo 09892 | bearworkslanka@gmail.com'; // Address and contact info
    const footerLines = doc.splitTextToSize(footerText, doc.internal.pageSize.width - 28); // Split text to fit the page

    doc.text(footerLines, 14, footerY + 10); // Draw footer text below the footer line

    // Save the PDF
    doc.save('Leave_Requests_List.pdf');
  };

  // Fetch the logo image and generate the PDF
  fetch(logo)
    .then(response => {
      if (!response.ok) {
        throw new Error('Logo not found');
      }
      return response.blob();
    })
    .then(blob => {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      img.src = url;

      img.onload = () => {
        generatePDFContent(img); // Generate PDF content with logo
      };

      img.onerror = () => {
        generatePDFContent(null); // Generate PDF content without logo
      };
    })
    .catch(error => {
      console.error('Error fetching logo:', error);
      generatePDFContent(null); // Generate PDF content without logo
    });
};



  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use the imported image here
    >
      <Header />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Leave Requests</h1>
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or employee ID"
            className="flex-grow p-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select
            value={typeFilter}
            onChange={handleTypeFilter}
            className="flex-grow mt-2 md:mt-0 md:ml-4 p-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">All Types</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
            <button
              onClick={generatePDF}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>

        {editingLeave && (
          <form onSubmit={handleFormSubmit} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Edit Leave Request</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="empId"
                value={formData.empId}
                onChange={handleFormChange}
                placeholder="Employee ID"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                readOnly // Prevent editing empId
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Name"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleFormChange}
                placeholder="Reason"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">Select Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Leave Request
            </button>
          </form>
        )}

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Employee ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Reason</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeaves.map(leave => (
                <tr key={leave._id}>
                  <td className="px-4 py-2 border">{leave.empId}</td>
                  <td className="px-4 py-2 border">{leave.name}</td>
                  <td className="px-4 py-2 border">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{leave.reason}</td>
                  <td className="px-4 py-2 border">{leave.type}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(leave)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(leave._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
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

export default LeaveRetrieve;
