import React, { useState } from 'react';
import './leaveform.css';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';
import backgroundImage from '../image/design.png'; // Adjust the path according to your folder structure

const LeaveRequestForm = () => {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const errors = {};

    if (!empId) {
      errors.empId = 'Employee ID is required.';
    } else if (!/^\d+$/.test(empId)) {
      errors.empId = 'Employee ID must be a numeric value.';
    } else if (empId.length > 5) { // Check for maximum length
      errors.empId = 'Employee ID cannot exceed 5 digits.';
    }

    if (!name) {
      errors.name = 'Name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = 'Name can only contain letters and spaces, no numbers or symbols allowed.';
    }

    if (!startDate) {
      errors.startDate = 'Start date is required.';
    } else if (startDate < today) {
      errors.startDate = 'Start date cannot be in the past.';
    }

    if (!endDate) {
      errors.endDate = 'End date is required.';
    } else if (endDate < startDate) { // Check if end date is before start date
      errors.endDate = 'End date must be after the start date.';
    }

    if (!reason) errors.reason = 'Reason is required.';
    if (!type) errors.type = 'Leave type is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('/api/Leave', {
        empId,
        name,
        startDate,
        endDate,
        reason,
        type,
      });

      setMessage(response.data.msg);

      // Reset form fields
      setEmpId('');
      setName('');
      setStartDate('');
      setEndDate('');
      setReason('');
      setType('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting leave request:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'An error occurred while submitting the leave request.');
      } else {
        setMessage('');
      }
    }
  };

  const handleViewClick = () => {
    navigate('/leavetable');
  };

  // Updated onChange for the name input
  const handleNameChange = (e) => {
    const input = e.target.value;
    // Only allow letters and spaces
    if (/^[a-zA-Z\s]*$/.test(input)) {
      setName(input);
    }
  };

  return (
    <div>
      <Header />
      <div 
        className="flex flex-col min-h-screen bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex-1 flex justify-center items-center">
          <div className="max-w-xl w-full bg-pink-100 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl p-10 border border-gray-200 space-y-6 z-10">
            <h2 className="text-4xl font-bold text-purple-600 mb-4 text-center">Leave Request Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="empId" className="block text-lg font-semibold text-gray-700">Employee ID</label>
                <input
                  id="empId"
                  type="text" // Keep type as text for better validation handling
                  value={empId}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numeric values and limit to 5 digits
                    if (/^\d{0,5}$/.test(value)) {
                      setEmpId(value);
                    }
                  }}
                  className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.empId && <p className="text-red-500">{errors.empId}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange} // Updated to use custom validation
                  className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="startDate" className="block text-lg font-semibold text-gray-700">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="endDate" className="block text-lg font-semibold text-gray-700">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={startDate || today} // Ensure End Date cannot be before Start Date
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="reason" className="block text-lg font-semibold text-gray-700">Reason</label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-24 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.reason && <p className="text-red-500">{errors.reason}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="type" className="block text-lg font-semibold text-gray-700">Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-10 border border-gray-300 p-1 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Type</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                </select>
                {errors.type && <p className="text-red-500">{errors.type}</p>}
              </div>
              <div className="flex justify-between">
                <button className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition duration-200" type="submit">
                  Submit
                </button>
                <button className="bg-gray-300 text-black rounded-lg px-4 py-2 hover:bg-gray-400 transition duration-200" type="button" onClick={handleViewClick}>
                  View
                </button>
              </div>
            </form>
            {message && <p className="text-green-500 text-center">{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaveRequestForm;
