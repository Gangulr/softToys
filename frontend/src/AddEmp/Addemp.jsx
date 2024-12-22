import React, { useState, useEffect } from 'react';
import './addemp.css';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const departments = [
  'Production Department',
  'Supply Chain and Procurement Department',
  'Sales and Marketing Department',
  'Order Management Department',
  'Human Resources Department',
  'Finance Department',
  'Logistics and Warehouse Department',
];

const employeeTypes = ['Permanent', 'Contract'];

const departmentToDesignation = {
  'Production Department': [
    { name: 'Production Manager', role: 'Permanent' },
    { name: 'Machine Operator', role: 'Contract' },
    { name: 'Production Worker', role: 'Contract' },
  ],
  'Supply Chain and Procurement Department': [
    { name: 'Supply Chain Manager', role: 'Permanent' },
    { name: 'Warehouse Manager', role: 'Permanent' },
    { name: 'Inventory Controller', role: 'Contract' },
  ],
  'Sales and Marketing Department': [
    { name: 'Sales Manager', role: 'Permanent' },
    { name: 'Marketing Manager', role: 'Permanent' },
    { name: 'Sales Representative', role: 'Contract' },
  ],
  'Order Management Department': [
    { name: 'Order Manager', role: 'Permanent' },
    { name: 'Order Fulfillment Coordinator', role: 'Contract' },
  ],
  'Human Resources Department': [
    { name: 'HR Manager', role: 'Permanent' },
    { name: 'Training and Development Officer', role: 'Contract' },
  ],
  'Finance Department': [
    { name: 'Finance Manager', role: 'Permanent' },
    { name: 'Financial Analyst', role: 'Contract' },
  ],
  'Logistics and Warehouse Department': [
    { name: 'Delivery Manager', role: 'Permanent' },
    { name: 'Delivery Driver', role: 'Contract' },
    { name: 'Inventory Specialist', role: 'Contract' },
  ],
};

const AddEmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState(departments[0]);
  const [designation, setDesignation] = useState('');
  const [employeeType, setEmployeeType] = useState(employeeTypes[0]);
  const [baseSalary, setBaseSalary] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [message, setMessage] = useState('');
  
  // State for current date
  const [currentDate, setCurrentDate] = useState('');

  const navigate = useNavigate();

  const validateEmployeeId = (id) => /^[0-9]{1,5}$/.test(id);
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  
  const validateNIC = (nic) => {
    const lengthValid = nic.length === 12 || (nic.length === 10 && /^[0-9]{9}[Vv]$/.test(nic));
    const restrictedChars = /^[0-9Vv]+$/.test(nic);
    return lengthValid && restrictedChars;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmployeeId(employeeId)) {
      setMessage('Employee ID must be numeric and up to 5 digits.');
      return;
    }
  
    if (!validateName(firstName) || !validateName(lastName)) {
      setMessage('Names can only contain letters and spaces.');
      return;
    }
  
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }
  
    if (!validateNIC(nic)) {
      setMessage('NIC must be 12 digits or 9 digits followed by V/v.');
      return;
    }
  
    if (!baseSalary || isNaN(baseSalary) || parseFloat(baseSalary) <= 0) {
      setMessage('Base Salary must be a positive number.');
      return;
    }

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      setMessage('Employee must be at least 18 years old.');
      return;
    }
  
    console.log({
      firstName,
      lastName,
      email,
      nic,
      department,
      employeeId,
      employeeType,
      designation,
      baseSalary,
      dateOfBirth,
      joiningDate,
      currentDate,
    });
  
    try {
      const response = await axios.post('/api/employee', {
        firstName,
        lastName,
        email,
        nic,
        department,
        employeeId,
        employeeType,
        designation,
        baseSalary: parseFloat(baseSalary),
        dateOfBirth,
        joiningDate,
        currentDate,
      });
  
      setMessage(response.data.msg || 'Employee added successfully!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setNic('');
      setDepartment(departments[0]);
      setEmployeeId('');
      setEmployeeType(employeeTypes[0]);
      setDesignation('');
      setBaseSalary('');
      setDateOfBirth('');
      setJoiningDate('');
      setCurrentDate('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while adding the employee.');
    }
  };
  
  const handleIdKeyPress = (event) => {
    const charCode = event.charCode;
    if (!/[0-9]/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  const handleNameKeyPress = (event) => {
    const charCode = event.charCode;
    if (!/[a-zA-Z\s]/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  const handleNicChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,12}$/.test(value) || /^\d{9}[Vv]?$/.test(value)) {
      setNic(value);
    }
  };

  const handleViewEmployees = () => {
    navigate('/emptable');
  };

  const getDesignationOptions = () => {
    return departmentToDesignation[department]
      .filter((desig) => desig.role === employeeType)
      .map((desig) => desig.name);
  };

  useEffect(() => {
    setDesignation('');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, [department, employeeType]);

  const maxDate = new Date().getFullYear() - 18; 
  const minDate = '1900-01-01'; 
  const restrictedMaxDate = `${maxDate}-12-31`;

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2 className="form-title">Add Employee Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyPress={handleNameKeyPress}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={handleNameKeyPress}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nic">NIC</label>
            <input
              id="nic"
              type="text"
              value={nic}
              onChange={handleNicChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              id="employeeId"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              onKeyPress={handleIdKeyPress}
              maxLength={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              {getDesignationOptions().map((desig) => (
                <option key={desig} value={desig}>{desig}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="employeeType">Employee Type</label>
            <select
              id="employeeType"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              {employeeTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="baseSalary">Base Salary</label>
            <input
              id="baseSalary"
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={restrictedMaxDate}
              min={minDate}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              id="joiningDate"
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              max={currentDate} // Prevents selecting a future date
              required
            />
          </div>
          <button type="submit" className="submit-button">Add Employee</button>
          <button type="button" onClick={handleViewEmployees}>View Employees</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default AddEmployeeForm;
