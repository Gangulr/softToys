import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/api/employee/${id}`);
      setEmployee(response.data);
    } catch (error) {
      setMessage('Failed to fetch employee data.');
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  // Validation functions
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateNIC = (nic) => {
    const lengthValid = nic.length === 12 || (nic.length === 10 && /^[0-9]{9}[Vv]$/.test(nic));
    const restrictedChars = /^[0-9Vv]+$/.test(nic);
    return lengthValid && restrictedChars;
  };
  const validateBaseSalary = (salary) => !isNaN(salary) && parseFloat(salary) > 0;
  const validateDepartment = (department) => /^[a-zA-Z\s]+$/.test(department);
  const validateDesignation = (designation) => /^[a-zA-Z\s]+$/.test(designation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message before validation

    const { firstName, lastName, email, nic, baseSalary, department, designation } = employee;

    // Validate inputs
    if (!validateName(firstName)) {
      setMessage('First Name can only contain letters and spaces.');
      return;
    }

    if (!validateName(lastName)) {
      setMessage('Last Name can only contain letters and spaces.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    if (!validateNIC(nic)) {
      setMessage('NIC must be 12 digits or 9 digits followed by V/v and should not contain any other characters.');
      return;
    }

    if (!validateDepartment(department)) {
      setMessage('Department can only contain letters and spaces.');
      return;
    }

    if (!validateDesignation(designation)) {
      setMessage('Designation can only contain letters and spaces.');
      return;
    }

    if (!validateBaseSalary(baseSalary)) {
      setMessage('Base Salary must be a positive number.');
      return;
    }

    try {
      const { joiningDate, employeeId, dateOfBirth, ...employeeData } = employee; // Prevent updating non-editable fields
      await axios.put(`/api/employee/${id}`, employeeData);
      setMessage('Employee updated successfully!');
      setTimeout(() => {
        navigate('/emptable'); // Redirect to employee list after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage('Failed to update employee.');
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={employee.firstName || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={employee.lastName || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={employee.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nic">NIC</label>
            <input
              id="nic"
              name="nic"
              type="text"
              value={employee.nic || ''}
              onChange={handleChange}
              required
              pattern="^(?!.*\s)(\d{12}|\d{9}[Vv])$"
              title="NIC must be 12 digits or 9 digits followed by V/v and should not contain any other characters."
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              value={employee.employeeId || ''}
              disabled // Make this field non-editable
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              type="text"
              value={employee.department || ''}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z\s]+$"
              title="Department can only contain letters and spaces."
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeeType">Employee Type</label>
            <select
              id="employeeType"
              name="employeeType"
              value={employee.employeeType || ''}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Employee Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              name="designation"
              type="text"
              value={employee.designation || ''}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z\s]+$"
              title="Designation can only contain letters and spaces."
            />
          </div>
          <div className="form-group">
            <label htmlFor="baseSalary">Base Salary</label>
            <input
              id="baseSalary"
              name="baseSalary"
              type="number"
              value={employee.baseSalary || ''}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={employee.dateOfBirth ? employee.dateOfBirth.substring(0, 10) : ''}
              disabled // Make this field non-editable
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              value={employee.joiningDate ? employee.joiningDate.substring(0, 10) : ''}
              onChange={handleChange}
              required
              disabled // Make this field non-editable
            />
            
          </div>
          <button type="submit">Update Employee</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default EditEmployee;
