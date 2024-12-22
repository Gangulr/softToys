import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import './salary.css';
import UpdateSalaryForm from './UpdateSalaryForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalaryDetailsTable = () => {
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingSalary, setEditingSalary] = useState(null);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get('/api/Salary');
        setSalaryDetails(response.data);
      } catch (err) {
        setError('Error fetching salary details');
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  const handleUpdate = async (updatedSalary) => {
    try {
      await axios.put(`/api/Salary/${updatedSalary._id}`, updatedSalary);
      fetchSalaries(); // Refetch the salary data after update
      setEditingSalary(null); // Close the update form
    } catch (err) {
      console.error('Error updating salary:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Salary/${id}`);
      setSalaryDetails((prevDetails) =>
        prevDetails.filter((detail) => detail._id !== id)
      );
    } catch (err) {
      console.error('Error deleting salary:', err);
    }
  };

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('/api/Salary');
      setSalaryDetails(response.data);
    } catch (err) {
      setError('Error fetching salary details');
    }
  };

  const filteredSalaryDetails = salaryDetails.filter((detail) => {
    const name = detail.employeeName?.toLowerCase() || '';
    const department = detail.department?.toLowerCase() || '';
    const empId = detail.employeeId?.toLowerCase() || '';
    return (
      name.includes(searchTerm.toLowerCase()) ||
      department.includes(searchTerm.toLowerCase()) ||
      empId.includes(searchTerm.toLowerCase())
    );
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Title
    doc.text('Salary Details', 14, 20);

    // Prepare data for the table
    const tableColumn = ["Employee ID", "Name", "Base Salary", "OT Hours", "Allowances", "Department"];
    const tableRows = filteredSalaryDetails.map(detail => [
      detail.employeeId,
      detail.employeeName,
      detail.baseSalary,
      detail.otHours,
      detail.allowances,
      detail.department,
    ]);

    // Create the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    
    // Save the generated PDF
    doc.save('salary_details.pdf');
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4">Salary Details Table</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, employee ID, or department"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={generatePDF}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Generate PDF
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {editingSalary && (
              <UpdateSalaryForm
                salary={editingSalary}
                onUpdate={handleUpdate}
                onClose={() => setEditingSalary(null)}
              />
            )}
            <table id="salaryTable" className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Employee ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Base Salary</th>
                  <th className="px-4 py-2 text-left">OT Hours</th>
                  <th className="px-4 py-2 text-left">Allowances</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaryDetails.length > 0 ? (
                  filteredSalaryDetails.map((detail) => (
                    <tr key={detail._id}>
                      <td className="px-4 py-2 border border-gray-300">{detail.employeeId}</td>
                      <td className="px-4 py-2 border border-gray-300">{detail.employeeName}</td>
                      <td className="px-4 py-2 border border-gray-300">{detail.baseSalary}</td>
                      <td className="px-4 py-2 border border-gray-300">{detail.otHours}</td>
                      <td className="px-4 py-2 border border-gray-300">{detail.allowances}</td>
                      <td className="px-4 py-2 border border-gray-300">{detail.department}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        <button
                          onClick={() => setEditingSalary(detail)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(detail._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 text-center">No salary details found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SalaryDetailsTable;
