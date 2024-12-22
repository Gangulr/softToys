import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import backgroundImage from '../image/design.png'; // Import your background image

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

    // Validate employee ID (only 5 digits allowed)
    if (!employeeSalaryDetails.employeeId) {
      errors.employeeId = 'Employee ID is required.';
    } else if (!/^\d{5}$/.test(employeeSalaryDetails.employeeId)) {
      errors.employeeId = 'Employee ID must be exactly 5 digits.';
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
    if (!/[0-9]/.test(String.fromCharCode(charCode)) || employeeSalaryDetails.employeeId.length >= 5) {
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
      <div 
        className="flex flex-col min-h-screen bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex-1 flex justify-center items-center p-4 bg-black bg-opacity-10">
          <div className="max-w-xl w-full bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl p-10 border border-gray-200 space-y-6 z-10">
            <h2 className="text-4xl font-bold text-purple-600 mb-4 text-center">
              {editMode ? 'Edit Salary Details' : 'Submit Salary Details'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="employeeId" className="block text-lg font-semibold text-gray-700">Employee ID</label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={employeeSalaryDetails.employeeId}
                  onChange={handleChange}
                  onKeyPress={handleIdKeyPress} // Prevent invalid characters
                  disabled={editMode}
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                />
                {validationErrors.employeeId && <p className="text-red-500">{validationErrors.employeeId}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="employeeName" className="block text-lg font-semibold text-gray-700">Employee Name</label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={employeeSalaryDetails.employeeName}
                  onChange={handleChange}
                  onKeyPress={handleNameKeyPress} // Prevent invalid characters
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {validationErrors.employeeName && <p className="text-red-500">{validationErrors.employeeName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={employeeSalaryDetails.email}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="baseSalary" className="block text-lg font-semibold text-gray-700">Base Salary</label>
                <input
                  type="number"
                  id="baseSalary"
                  name="baseSalary"
                  value={employeeSalaryDetails.baseSalary}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {validationErrors.baseSalary && <p className="text-red-500">{validationErrors.baseSalary}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="allowances" className="block text-lg font-semibold text-gray-700">Allowances</label>
                <input
                  type="number"
                  id="allowances"
                  name="allowances"
                  value={employeeSalaryDetails.allowances}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="form-group">
                <label htmlFor="otHours" className="block text-lg font-semibold text-gray-700">OT Hours</label>
                <input
                  type="number"
                  id="otHours"
                  name="otHours"
                  value={employeeSalaryDetails.otHours}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="form-group">
                <label htmlFor="department" className="block text-lg font-semibold text-gray-700">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={employeeSalaryDetails.department}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 p-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  {editMode ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleViewClick}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  View Salary Details
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {isSubmitted && <p className="text-green-500 text-center">Submitted successfully!</p>}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeSalaryDetailsForm;
