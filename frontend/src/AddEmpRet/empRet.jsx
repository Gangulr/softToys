import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import autoTable plugin for jsPDF
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch all employees from the API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employee');
      setEmployees(response.data);
      setFilteredEmployees(response.data); // Initialize filtered employees
    } catch (error) {
      setMessage('Failed to fetch employee data.');
    }
  };

  // Delete employee handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/employee/${id}`);
        setMessage('Employee deleted successfully.');
        fetchEmployees(); // Refresh the list
      } catch (error) {
        setMessage('Failed to delete employee.');
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Search functionality: filters employees based on search term (includes Employee ID)
  useEffect(() => {
    const results = employees.filter((employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) // Search by Employee ID
    );
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Employee List', 20, 10);
    
    // Add table headers
    const headers = [['First Name', 'Last Name', 'Email', 'Employee ID', 'NIC', 'Department', 'Employee Type', 'Designation', 'Base Salary', 'DOB', 'Joining Date']];
    
    // Map filtered employees to table data
    const data = filteredEmployees.map(emp => [
      emp.firstName,
      emp.lastName,
      emp.email,
      emp.employeeId,
      emp.nic,
      emp.department,
      emp.employeeType,
      emp.designation,
      emp.baseSalary,
      new Date(emp.dateOfBirth).toLocaleDateString(),
      new Date(emp.joiningDate).toLocaleDateString()
    ]);
    
    // Generate table in PDF
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20
    });
    
    // Save the PDF and download
    doc.save('Employee_List.pdf');
  };

  return (
    <div>
      <Header />
      <div className="employee-list-container">
        <h2>Employee List</h2>
        {message && <p className="message">{message}</p>}
        
        {/* Search input */}
        <input 
          type="text" 
          placeholder="Search employees by name, email, department, or employee ID..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ marginBottom: '20px' }}
        />

        {/* Button to generate PDF */}
        <button onClick={generatePDF} style={{ marginBottom: '20px' }}>
          Generate PDF
        </button>

        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>NIC</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Designation</th>
              <th>Base Salary</th>
              <th>Date of Birth</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.employeeId}</td> {/* Employee ID */}
                <td>{employee.nic}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>{employee.designation}</td>
                <td>{employee.baseSalary}</td>
                <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/edit-employee/${employee._id}`)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
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

export default EmployeeList;
