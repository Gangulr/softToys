import React, { useState, useEffect } from 'react';
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Link } from "react-router-dom";
import "./HRinterface.css";
import Hr from '../image/hr.png';


function HRinterface() {
  const [attendanceData, setAttendanceData] = useState({ presentCount: 0, absentCount: 0 });
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today's date

  // Fetch attendance count on component mount and when the date changes
  useEffect(() => {
    fetchAttendanceData();
  }, [date]);

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`/api/attendance/work-hours?date=${date}`);
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  return (
    <div className="financeInterface">
      <Link to="/hr-report"></Link>
      <Header />
      <div>
        {/* Scrollable Body */}
        <div className="scrollableBody">
          <div className="content">
            <h1 className="title">HR Management</h1>
            <p className="description">
              The HR Management System streamlines salary management, attendance tracking, and leave requests by automating payroll, real-time attendance tracking, and online leave submissions. It enhances HR efficiency and ensures accurate management of essential functions.
            </p>
            
            <Link to="dashboard">
              <button className="ctaButton">Dashboard</button>
              <br /><br />
            </Link>

            <Link to="addemp">
              <button className="ctaButton">Add employee</button>
              <br /><br />
            </Link>

            <Link to="leaveform">
              <button className="ctaButton">Leave Request Form</button>
              <br /><br />
            </Link>

            <Link to="salarymang">
              <button className="ctaButton">Salary details Form</button>
              <br /><br />
            </Link>

            <Link to="attendancetrack">
              <button className="ctaButton">Attendance Form</button>
              <br /><br />
            </Link>

            <Link to="hr-report">
              <button className="ctaButton">Report</button>
              <br /><br />
            </Link>
          </div>

          <div className="illustration">
            <img
              src={Hr}
              alt="HR Illustration"
              className="illustrationImage"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HRinterface;
