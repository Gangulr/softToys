// src/components/HRDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HRDashboard.css';

function HRDashboard() {
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [leaveRequestCount, setLeaveRequestCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Fetch the counts and notifications from the backend
  useEffect(() => {
    const fetchCountsAndNotifications = async () => {
      try {
        const [attendanceResponse, leaveResponse, employeeResponse, notificationsResponse] = await Promise.all([
          axios.get('/api/attendance/count'),
          axios.get('/api/leave/requests/count'),
          axios.get('/api/employees/count'), // Fetching employee count
          axios.get('/api/notifications'), // Fetch notifications
        ]);

        // Update state with the counts and notifications
        setAttendanceCount(attendanceResponse.data.count);
        setLeaveRequestCount(leaveResponse.data.count);
        setEmployeeCount(employeeResponse.data.count); // Setting the employee count
        setNotifications(notificationsResponse.data); // Update notifications state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountsAndNotifications();
  }, []);

  // Handle approval or rejection of notifications (for leave requests)
  const handleAction = async (id, action) => {
    try {
      // Send the action (approve/reject) to the backend
      await axios.put(`/api/notifications/${id}/${action}`);

      // Refetch notifications after the action is performed
      const response = await axios.get('/api/notifications');
      setNotifications(response.data); // Update notifications
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">HR Dashboard</h1>

      {/* Display the counts */}
      <div className="counts-section">
        <p>Attendance Count: {attendanceCount}</p>
        <p>Leave Request Count: {leaveRequestCount}</p>
        <p>Employee Count: {employeeCount}</p> {/* Displaying employee count */}
      </div>

      {/* Notification Section */}
      <div className="notification-section">
        <h2>Notifications</h2>
        <ul className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification._id} className="notification-item">
                <span>{notification.message}</span>
                <button
                  onClick={() => handleAction(notification._id, 'approve')}
                  className="approve-button"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(notification._id, 'reject')}
                  className="reject-button"
                >
                  Reject
                </button>
              </li>
            ))
          ) : (
            <li>No new notifications</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HRDashboard;
