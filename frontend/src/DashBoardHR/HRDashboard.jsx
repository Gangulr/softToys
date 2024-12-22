import React, { useEffect, useState } from 'react';
import './HRDashboard.css'; // CSS file for styling
import axios from 'axios'; // Assuming you use axios for API requests

function HRDashboard() {
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [leaveRequestCount, setLeaveRequestCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  // Fetch the counts from the backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const attendanceResponse = await axios.get('/api/attendance/count');
        const leaveResponse = await axios.get('/api/leave/requests/count');
        const employeeResponse = await axios.get('/api/employees/count');

        // Update state with the counts
        setAttendanceCount(attendanceResponse.data.count);
        setLeaveRequestCount(leaveResponse.data.count);
        setEmployeeCount(employeeResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">HR Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat">
          <h2 className="stat-title">Employee Attendance Count</h2>
          <p className="stat-value">{attendanceCount}</p>
        </div>
        <div className="stat">
          <h2 className="stat-title">Leave Request Count</h2>
          <p className="stat-value">{leaveRequestCount}</p>
        </div>
        <div className="stat">
          <h2 className="stat-title">Total Employee Count</h2>
          <p className="stat-value">{employeeCount}</p>
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;
