import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const HRReport = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employee');
        setEmployees(response.data);
      } catch (err) {
        setError('Failed to retrieve employees. Please try again later.');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const generateDailyData = () => {
    const dailyCounts = {};
    employees.forEach(emp => {
      const dateAdded = new Date(emp.joiningDate);
      const day = dateAdded.getDate();
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });

    return {
      labels: Object.keys(dailyCounts),
      datasets: [
        {
          label: 'Daily Joinings',
          data: Object.values(dailyCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const generateMonthlyData = () => {
    const monthlyCounts = {};
    employees.forEach(emp => {
      const dateAdded = new Date(emp.joiningDate);
      const month = dateAdded.getMonth() + 1; // Months are zero-based
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    return {
      labels: Object.keys(monthlyCounts),
      datasets: [
        {
          label: 'Monthly Joinings',
          data: Object.values(monthlyCounts),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const generateYearlyData = () => {
    const yearlyCounts = {};
    employees.forEach(emp => {
      const dateAdded = new Date(emp.joiningDate);
      const year = dateAdded.getFullYear();
      yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
    });

    return {
      labels: Object.keys(yearlyCounts),
      datasets: [
        {
          label: 'Yearly Joinings',
          data: Object.values(yearlyCounts),
          fill: false,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          tension: 0.1,
        },
      ],
    };
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">HR Report</h1>
        <div className="flex flex-col md:flex-row justify-around mb-6">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Bar Chart - Daily Joinings</h2>
            <Bar data={generateDailyData()} options={{ responsive: true }} />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Bar Chart - Monthly Joinings</h2>
            <Bar data={generateMonthlyData()} options={{ responsive: true }} />
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Line Chart - Yearly Joinings</h2>
          <Line data={generateYearlyData()} options={{ responsive: true }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HRReport;
