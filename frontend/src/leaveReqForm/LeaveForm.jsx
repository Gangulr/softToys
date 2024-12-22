import React, { useState } from 'react';
import './leaveform.css';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';

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
    } else if (endDate < startDate) {
      errors.endDate = 'End date cannot be before the start date.';
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
        setMessage('An error occurred while submitting the leave request.');
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
      <div className="form-container">
        <h2 className="form-title">Leave Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empId">Employee ID</label>
            <input
              id="empId"
              type="number"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              min="0"
            />
            {errors.empId && <p className="error">{errors.empId}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange} // Updated to use custom validation
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && <p className="error">{errors.startDate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && <p className="error">{errors.endDate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            {errors.reason && <p className="error">{errors.reason}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
            </select>
            {errors.type && <p className="error">{errors.type}</p>}
          </div>
          <div className="button-container">
            <button className="submit-button" type="submit">
              Submit
            </button>
            <button className="view-button" type="button" onClick={handleViewClick}>
              View
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default LeaveRequestForm;
