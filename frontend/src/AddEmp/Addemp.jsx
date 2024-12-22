import React, { useState, useEffect } from 'react';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../image/design.png';

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
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  // Validations
  const validateEmployeeId = (id) => /^[0-9]{1,5}$/.test(id);
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateNIC = (nic) => {
    const lengthValid = nic.length === 12 || (nic.length === 10 && /^[0-9]{9}[Vv]$/.test(nic));
    return lengthValid;
  };
  const validateSalary = (salary) => salary > 0;

  // Form Submission Handler
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

    if (!validateSalary(parseFloat(baseSalary))) {
      setMessage('Base Salary must be a positive number.');
      return;
    }

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      setMessage('Employee must be at least 18 years old.');
      return;
    }

    const joining = new Date(joiningDate);
    const birth = new Date(dateOfBirth);
    if (joining <= birth) {
      setMessage('Joining date must be after date of birth.');
      return;
    }

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
      });

      setMessage(response.data.msg || 'Employee added successfully!');
      resetForm();
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || 'An error occurred while adding the employee.';
      setMessage(errorMessage);
    }
  };

  // Reset Form
  const resetForm = () => {
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
    setJoiningDate(currentDate); // Reset to the initial value
    setMessage(''); // Reset message
  };

  // Input Handlers
  const handleIdChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,5}$/.test(value)) { // Allow up to 5 digits
      setEmployeeId(value);
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
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
    setJoiningDate(formattedDate);
  }, [department, employeeType]);

  const maxDate = new Date().getFullYear() - 18;
  const restrictedMaxDate = `${maxDate}-12-31`;

  return (
    <div
      className="min-h-screen bg-pink-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 10rem)', // Adjust height for header and footer
      }}
    >
      <Header />
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-8">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-8">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                onKeyPress={handleNameKeyPress}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                onKeyPress={handleNameKeyPress}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NIC</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={nic}
              onChange={handleNicChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={employeeId}
              onChange={handleIdChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDesignation(''); // Reset designation when department changes
              }}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <select
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Type</label>
            <select
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={employeeType}
              onChange={(e) => {
                setEmployeeType(e.target.value);
                setDesignation(''); // Reset designation when employee type changes
              }}
            >
              {employeeTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Base Salary</label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                max={restrictedMaxDate} // 18 years restriction
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Joining Date</label>
              <input
                type="date"
                className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                required
              />
            </div>
          </div>
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-purple-700"
          >
            Add Employee
          </button>
        </form>
        <button
          onClick={handleViewEmployees}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          View Employees
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AddEmployeeForm;
