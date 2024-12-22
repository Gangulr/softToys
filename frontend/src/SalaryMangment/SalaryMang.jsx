import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalaryMang.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const EmployeeSalaryDetailsForm = () => {
  const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState({
    employeeId: '',
    employeeName: '',
    email: '',
    baseSalary: 0,
    allowances: 0,
    otHours: 0,
    department: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL parameters if editing

  useEffect(() => {
    if (id) {
      // Fetch existing data if in edit mode
      const fetchSalaryDetails = async () => {
        try {
          const response = await axios.get(`/api/Salary/${id}`);
          setEmployeeSalaryDetails(response.data);
          setEditMode(true);
        } catch (err) {
          setError('Error fetching salary details');
        } finally {
          setLoading(false);
        }
      };

      fetchSalaryDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  // Validation function
  const validateForm = () => {
    const errors = {};

    // Validate employee ID (only numbers allowed)
    if (!employeeSalaryDetails.employeeId) {
      errors.employeeId = 'Employee ID is required.';
    } else if (!/^\d+$/.test(employeeSalaryDetails.employeeId)) {
      errors.employeeId = 'Employee ID must contain only numbers.';
    }

    // Validate employee name (no numbers or symbols)
    if (!employeeSalaryDetails.employeeName) {
      errors.employeeName = 'Employee Name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(employeeSalaryDetails.employeeName)) {
      errors.employeeName = 'Name can only contain letters and spaces.';
    }

    // Validate email
    if (!employeeSalaryDetails.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(employeeSalaryDetails.email)) {
      errors.email = 'Email is not valid. Ensure it has "@" and a domain (e.g., ".com").';
    }

    // Validate base salary
    if (!employeeSalaryDetails.baseSalary || employeeSalaryDetails.baseSalary <= 0) {
      errors.baseSalary = 'Base Salary must be a positive number.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;

    try {
      if (editMode) {
        await axios.put(`/api/Salary/${id}`, employeeSalaryDetails);
      } else {
        await axios.post('/api/Salary', employeeSalaryDetails);
      }
      setIsSubmitted(true);

      // Navigate to salary table or a success page after submission
      
     
    } catch (err) {
      setError('Error submitting salary details');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeSalaryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Prevent non-numeric characters in the employeeId field
  const handleIdKeyPress = (event) => {
    const charCode = event.charCode;
    if (!/[0-9]/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  // Prevent non-letter characters in the employee name field
  const handleNameKeyPress = (event) => {
    const charCode = event.charCode;
    if (!/[a-zA-Z\s]/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  const handleViewClick = () => {
    navigate('/salarytable');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2 className="form-title">{editMode ? 'Edit Salary Details' : 'Submit Salary Details'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employeeSalaryDetails.employeeId}
              onChange={handleChange}
              onKeyPress={handleIdKeyPress} // Prevent invalid characters
              disabled={editMode}
            />
            {validationErrors.employeeId && <p className="error">{validationErrors.employeeId}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={employeeSalaryDetails.employeeName}
              onChange={handleChange}
              onKeyPress={handleNameKeyPress} // Prevent invalid characters
            />
            {validationErrors.employeeName && <p className="error">{validationErrors.employeeName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={employeeSalaryDetails.email}
              onChange={handleChange}
            />
            {validationErrors.email && <p className="error">{validationErrors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="baseSalary">Base Salary</label>
            <input
              type="number"
              id="baseSalary"
              name="baseSalary"
              value={employeeSalaryDetails.baseSalary}
              onChange={handleChange}
            />
            {validationErrors.baseSalary && <p className="error">{validationErrors.baseSalary}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="allowances">Allowances</label>
            <input
              type="number"
              id="allowances"
              name="allowances"
              value={employeeSalaryDetails.allowances}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="otHours">OT Hours</label>
            <input
              type="number"
              id="otHours"
              name="otHours"
              value={employeeSalaryDetails.otHours}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={employeeSalaryDetails.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              {editMode ? 'Update' : 'Submit'}
            </button>
            <button type="button" className="view-button" onClick={handleViewClick}>
              View
            </button>
          </div>
        </form>
        {isSubmitted && (
          <div className="submitted-details">
            <h3>{editMode ? 'Updated' : 'Submitted'} Employee Salary Details:</h3>
            <p>Employee ID: {employeeSalaryDetails.employeeId}</p>
            <p>Employee Name: {employeeSalaryDetails.employeeName}</p>
            <p>Email: {employeeSalaryDetails.email}</p>
            <p>Base Salary: {employeeSalaryDetails.baseSalary}</p>
            <p>Allowances: {employeeSalaryDetails.allowances}</p>
            <p>OT Hours: {employeeSalaryDetails.otHours}</p>
            <p>Department: {employeeSalaryDetails.department}</p>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeSalaryDetailsForm;
