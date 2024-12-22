import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import backgroundImage from '../image/design.png'; // Import your background image

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
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div
        className="flex-1 flex justify-center items-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-xl w-full bg-pink-100 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl p-10 border border-gray-200 space-y-6 z-10">
          <h2 className="text-4xl font-bold text-purple-600 mb-4 text-center">Track Attendance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="empId" className="block text-lg font-semibold text-gray-700">Employee ID</label>
              <input
                type="text"
                id="empId"
                value={empId}
                onInput={handleEmpIdInput}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                pattern="\d{5}"
                title="Please enter exactly 5 digits"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date" className="block text-lg font-semibold text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min={currentDate} // Restrict to today's date
                max={currentDate} // Prevent future dates
              />
            </div>
            <div className="form-group">
              <label htmlFor="clockIn" className="block text-lg font-semibold text-gray-700">Clock In</label>
              <input
                type="time"
                id="clockIn"
                value={clockIn}
                onChange={(e) => setClockIn(e.target.value)}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min={date === currentDate ? currentTime : "00:00"} // Ensure current time restriction
              />
              {clockInError && <p className="text-red-500">{clockInError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="clockOut" className="block text-lg font-semibold text-gray-700">Clock Out</label>
              <input
                type="time"
                id="clockOut"
                value={clockOut}
                onChange={(e) => {
                  setClockOut(e.target.value);
                  setClockInError(''); // Clear error when user changes clockOut
                }}
                className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min={clockIn || (date === currentDate ? currentTime : "00:00")} // Ensure valid clock-out time
              />
            </div>
            <div className="form-group flex items-center">
              <label htmlFor="present" className="block text-lg font-semibold text-gray-700 mr-2">Present</label>
              <input
                type="checkbox"
                id="present"
                checked={present}
                onChange={(e) => setPresent(e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
            </div>
            <div className="button-container flex justify-between">
              <button type="submit" className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition duration-200">Submit</button>
              <button type="button" className="bg-gray-300 text-black rounded-lg px-4 py-2 hover:bg-gray-400 transition duration-200" onClick={handleViewClick}>View Attendance</button>
            </div>
          </form>
          {viewMessage && <p className="text-green-500 text-center">{viewMessage}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AttendanceTrackingForm;
