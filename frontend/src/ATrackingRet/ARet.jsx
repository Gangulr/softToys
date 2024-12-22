import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import backgroundImage from '../image/BR.png'; // Import the background image
import logo from '../image/logo.png';

const AttendanceRetrieve = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employee');
      setEmployees(response.data);
    } catch (error) {
      setMessage('Failed to fetch employee data.');
    }
  };

  const fetchAttendances = async () => {
    try {
      const response = await axios.get('/api/Attendence');
      setAttendanceData(response.data);
    } catch (error) {
      setMessage('Failed to fetch attendance data.');
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendances();
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const todayAttendances = attendanceData.filter((attendance) => {
      const attendanceDate = new Date(attendance.date).toLocaleDateString();
      return attendanceDate === today;
    });

    const filtered = employees.filter((employee) => {
      const attendanceRecord = todayAttendances.find((att) => att.empId === employee.employeeId);
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter
        ? (statusFilter === 'Present' ? attendanceRecord?.present : !attendanceRecord?.present)
        : true;

      return matchesSearch && matchesStatus;
    });

    setFilteredEmployees(filtered);
  }, [employees, attendanceData, searchTerm, statusFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('');
    setFilteredEmployees(employees);
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
      doc.text('Employee Attendance Report', 14, 50); // Title of the report
  
      // Prepare Table Headers
      const headers = [['First Name', 'Last Name', 'Employee ID', 'Status']];
  
      // Prepare the body for the table
      const data = filteredEmployees.map((emp) => {
        const attendanceRecord = attendanceData.find((att) => att.empId === emp.employeeId);
        const status = attendanceRecord ? (attendanceRecord.present ? 'Present' : 'Absent') : 'Absent';
        return [emp.firstName, emp.lastName, emp.employeeId, status];
      });
  
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
      doc.save('Employee_Attendance_Report.pdf');
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
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Attendance Records</h1>
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Employee ID"
            className="w-full md:w-1/2 lg:w-1/3 p-1 text-sm text-gray-700 border border-gray-300 rounded" // Adjusted padding
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="w-full md:w-1/2 lg:w-1/3 p-1 text-sm text-gray-700 border border-gray-300 rounded" // Adjusted padding
          >
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" // Adjusted padding
          >
            Reset
          </button>
          <button
            onClick={generatePDF}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" // Adjusted padding
          >
            Download PDF
          </button>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full w-full table-auto border-collapse divide-y divide-gray-200"> {/* Adjusted width */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => {
                  const attendanceRecord = attendanceData.find(
                    (att) => att.empId === employee.employeeId
                  );
                  const status = attendanceRecord
                    ? attendanceRecord.present
                      ? 'Present'
                      : 'Absent'
                    : 'Absent';
                  return (
                    <tr key={employee._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {status}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AttendanceRetrieve;
