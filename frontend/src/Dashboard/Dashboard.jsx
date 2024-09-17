// src/Dashboard.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Data',
    },
  },
};

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1>Dashboard</h1>
      </header>
      <main style={styles.mainContent}>
        <div style={styles.summaryCards}>
          <div style={styles.card}>
            <h2>Total Sales</h2>
            <p>$1,234</p>
          </div>
          <div style={styles.card}>
            <h2>Active Users</h2>
            <p>567</p>
          </div>
        </div>
        <div style={styles.chart}>
          <Bar data={data} options={options} />
        </div>
        <div style={styles.recentActivities}>
          <h2>Recent Activities</h2>
          <ul>
            <li>Logged in at 10:00 AM</li>
            <li>Completed a task at 11:30 AM</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

const styles = {
  dashboard: {
    fontFamily: 'Arial, sans-serif',
    padding: '16px',
  },
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '16px',
    textAlign: 'center',
  },
  mainContent: {
    padding: '16px',
  },
  summaryCards: {
    display: 'flex',
    gap: '16px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '16px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  chart: {
    marginTop: '16px',
  },
  recentActivities: {
    marginTop: '16px',
  },
  recentActivitiesTitle: {
    margin: '0',
    fontSize: '18px',
  },
  recentActivitiesList: {
    listStyleType: 'none',
    padding: '0',
    margin: '8px 0 0',
  },
  recentActivitiesItem: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    marginBottom: '8px',
    padding: '8px',
  },
};

export default Dashboard;
