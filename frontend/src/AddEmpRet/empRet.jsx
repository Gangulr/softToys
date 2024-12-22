import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import autoTable plugin for jsPDF
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import backgroundImage from '../image/BR.png'; // Import the background image
import logo from '../image/logo.png';


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
  
    // Fetch and add the logo
    const addLogo = (img) => {
      if (img) {
        doc.addImage(img, 'PNG', 14, 10, 50, 20); // Adjust position and size
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
      doc.text('Employee List Report', 14, 50); // Title of the report
  
      // Prepare Table Headers
      const headers = [['First Name', 'Last Name', 'Email', 'Employee ID', 'NIC', 'Department', 'Employee Type', 'Designation', 'Base Salary', 'DOB', 'Joining Date']];
  
      // Prepare the body for the table
      if (filteredEmployees && filteredEmployees.length > 0) {
        const data = filteredEmployees.map((emp) => [
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
  
        // Add Table
        doc.autoTable({
          head: headers,
          body: data,
          startY: 60, // Adjust starting Y position after the title
        });
      } else {
        // If no data is available
        doc.text('No employee data available.', 14, 60);
      }
  
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
      doc.save('Employee_List.pdf');
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
  






  return (
    <div>
      <Header />
      <div
        className="container mx-auto p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensures the container takes full viewport height
          padding: '20px', // Add padding around the entire container
          boxSizing: 'border-box' // Ensure padding is included in height
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Employee List</h2>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        
        {/* Search input */}
        <input 
          type="text" 
          placeholder="Search employees by name, email, department, or employee ID..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />

        {/* Button to generate PDF */}
        <button onClick={generatePDF} className="bg-blue-500 text-white rounded px-4 py-2 mb-4">
          Generate PDF
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 mb-8"> {/* Add margin-bottom for spacing */}
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-2 px-4 border">First Name</th>
                <th className="py-2 px-4 border">Last Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Employee ID</th>
                <th className="py-2 px-4 border">NIC</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Employee Type</th>
                <th className="py-2 px-4 border">Designation</th>
                <th className="py-2 px-4 border">Base Salary</th>
                <th className="py-2 px-4 border">Date of Birth</th>
                <th className="py-2 px-4 border">Joining Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{employee.firstName}</td>
                  <td className="py-2 px-4 border">{employee.lastName}</td>
                  <td className="py-2 px-4 border">{employee.email}</td>
                  <td className="py-2 px-4 border">{employee.employeeId}</td>
                  <td className="py-2 px-4 border">{employee.nic}</td>
                  <td className="py-2 px-4 border">{employee.department}</td>
                  <td className="py-2 px-4 border">{employee.employeeType}</td>
                  <td className="py-2 px-4 border">{employee.designation}</td>
                  <td className="py-2 px-4 border">{employee.baseSalary}</td>
                  <td className="py-2 px-4 border">{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{new Date(employee.joiningDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">
                    <button 
                      onClick={() => navigate(`/edit-employee/${employee._id}`)} 
                      className="bg-yellow-500 text-white rounded px-2 py-1 mr-2">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(employee._id)} 
                      className="bg-red-500 text-white rounded px-2 py-1">
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

export default EmployeeList;
