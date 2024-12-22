import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    employeeId: '',
    employeeType: '',
    baseSalary: '',
    dateOfBirth: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  // States for reports
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [yearlyReport, setYearlyReport] = useState([]);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employee');
        setEmployees(response.data);
        calculateReports(response.data); // Calculate reports after fetching employees
      } catch (err) {
        setError('Error fetching employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const calculateReports = (employees) => {
    const dailyCounts = {};
    const monthlyCounts = {};
    const yearlyCounts = {};

    employees.forEach(emp => {
      const dateAdded = new Date(emp.dateAdded);
      const year = dateAdded.getFullYear();
      const month = dateAdded.getMonth() + 1; // Months are zero-based
      const day = dateAdded.getDate();

      // Count daily reports
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;

      // Count monthly reports
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;

      // Count yearly reports
      yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
    });

    // Prepare data for charts
    const dailyData = Object.entries(dailyCounts).map(([day, count]) => ({ day, count }));
    const monthlyData = Object.entries(monthlyCounts).map(([month, count]) => ({ month, count }));
    const yearlyData = Object.entries(yearlyCounts).map(([year, count]) => ({ year, count }));

    setDailyReport(dailyData);
    setMonthlyReport(monthlyData);
    setYearlyReport(yearlyData);
  };

  // Handle form changes for updating employee
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="employee-list-container">
      <Header />
      <h2>Employee List</h2>

      {/* Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Employee ID"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Charts for daily, monthly, and yearly reports */}
      <div className="charts">
        <h3>Daily Report</h3>
        <BarChart width={600} height={300} data={dailyReport}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>

        <h3>Monthly Report</h3>
        <BarChart width={600} height={300} data={monthlyReport}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>

        <h3>Yearly Report</h3>
        <BarChart width={600} height={300} data={yearlyReport}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ff7300" />
        </BarChart>
      </div>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Type</th>
            <th>Salary</th>
            <th>DOB</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.baseSalary}</td>
              <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
              <td>{new Date(employee.dateAdded).toLocaleDateString()}</td> {/* Display date added */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Form */}
      {/* Add the update form similar to your original component, but ensure consistency */}

      <Footer />
    </div>
  );
};

export default EmployeeList;
