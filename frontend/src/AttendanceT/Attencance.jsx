import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const AttendanceTrackingForm = () => {
  const [empId, setEmpId] = useState('');
  const [date, setDate] = useState('');
  const [clockIn, setClockIn] = useState('');
  const [clockOut, setClockOut] = useState('');
  const [present, setPresent] = useState(false);
  const [viewMessage, setViewMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [clockInError, setClockInError] = useState('');
  const navigate = useNavigate();

  // Get current date and time
  useEffect(() => {
    const now = new Date();
    const currentDateString = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTimeString = now.toTimeString().split(' ')[0]; // HH:MM:SS format

    setCurrentDate(currentDateString); // Set today's date as default
    setDate(currentDateString);         // Set the default date to current date
    setCurrentTime(currentTimeString.slice(0, 5)); // HH:MM for min attribute
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled correctly
    if (!empId || !date || !clockIn || !clockOut) {
      setClockInError('Please fill all the fields correctly.');
      return;
    }

    if (clockOut <= clockIn) {
      setClockInError('Clock-out time must be after clock-in time.');
      return;
    }

    const attendanceData = {
      empId,
      date,
      clockIn,
      clockOut,
      present,
    };

    try {
      await axios.post('/api/attendence', attendanceData);
      setEmpId('');
      setDate(currentDate);
      setClockIn('');
      setClockOut('');
      setPresent(false);
      setClockInError('');
      setViewMessage('Attendance record added successfully!');
  } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setClockInError('Failed to add attendance record. ' + (error.response ? error.response.data.message : ''));
  }
  
  };

  const handleViewClick = () => {
    navigate('/attetable');
  };

  // Restrict Employee ID to 5 numeric characters only
  const handleEmpIdInput = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setEmpId(value);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2 className="form-title">Track Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empId">Employee ID </label>
            <input
              type="text"
              id="empId"
              value={empId}
              onInput={handleEmpIdInput}
              className="form-input"
              required
              pattern="\d{5}"
              title="Please enter exactly 5 digits"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
              required
              min={currentDate} // Restrict to today's date
              max={currentDate} // Prevent future dates
            />
          </div>
          <div className="form-group">
            <label htmlFor="clockIn">Clock In</label>
            <input
              type="time"
              id="clockIn"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
              className="form-input"
              required
              min={date === currentDate ? currentTime : "00:00"} // Ensure current time restriction
            />
            {clockInError && <p className="error-message">{clockInError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="clockOut">Clock Out</label>
            <input
              type="time"
              id="clockOut"
              value={clockOut}
              onChange={(e) => {
                setClockOut(e.target.value);
                setClockInError(''); // Clear error when user changes clockOut
              }}
              className="form-input"
              required
              min={clockIn || (date === currentDate ? currentTime : "00:00")} // Ensure valid clock-out time
            />
          </div>
          <div className="form-group">
            <label htmlFor="present">Present</label>
            <input
              type="checkbox"
              id="present"
              checked={present}
              onChange={(e) => setPresent(e.target.checked)}
              className="form-checkbox"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="view-button" onClick={handleViewClick}>View Attendance</button>
          </div>
        </form>
        {viewMessage && <p className="view-message">{viewMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default AttendanceTrackingForm;
