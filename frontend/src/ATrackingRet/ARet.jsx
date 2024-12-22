import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AttendanceRetrieve = () => {
  const [attendances, setAttendances] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch attendance data from the database
  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get('/api/Attendence');
        setAttendances(response.data);
        setFilteredAttendances(response.data);
      } catch (error) {
        console.error('Error fetching attendances:', error);
      }
    };

    fetchAttendances();
  }, []);

  // Filter attendances based on search term and status filter
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterAttendances(term, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterAttendances(searchTerm, status);
  };

  const filterAttendances = (term, status) => {
    const filtered = attendances.filter((attendance) => {
      const matchesSearch = attendance.empId.toLowerCase().includes(term.toLowerCase());
      const matchesStatus = status ? attendance.present === (status === 'Present') : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredAttendances(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('');
    setFilteredAttendances(attendances);
  };

  // Generate PDF function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Title
    doc.text('Attendance Records', 14, 20);

    // Prepare data for the table
    const tableColumn = ["Employee ID", "Date", "Clock In", "Clock Out", "Status"];
    const tableRows = filteredAttendances.map(attendance => [
      attendance.empId,
      new Date(attendance.date).toLocaleDateString(),
      attendance.clockIn,
      attendance.clockOut,
      attendance.present ? 'Present' : 'Absent',
    ]);

    // Create the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 30 });

    // Save the generated PDF
    doc.save('attendance_records.pdf');
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4">Attendance Records</h1>
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Employee ID"
            className="w-full md:w-1/2 lg:w-1/3 p-2 text-sm text-gray-700 border border-gray-300 rounded"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="w-full md:w-1/2 lg:w-1/3 p-2 text-sm text-gray-700 border border-gray-300 rounded"
          >
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
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

        {/* Attendance Table */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Employee ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Clock In</th>
              <th className="px-4 py-2 border">Clock Out</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendances.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No attendance records found.</td>
              </tr>
            ) : (
              filteredAttendances.map((attendance) => (
                <tr key={attendance._id}>
                  <td className="border px-4 py-2">{attendance.empId}</td>
                  <td className="border px-4 py-2">{new Date(attendance.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{attendance.clockIn}</td>
                  <td className="border px-4 py-2">{attendance.clockOut}</td>
                  <td className="border px-4 py-2">{attendance.present ? 'Present' : 'Absent'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AttendanceRetrieve;
