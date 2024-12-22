import React, { useState } from 'react';

const UpdateSalaryForm = ({ salary, onUpdate, onClose }) => {
  const [updatedSalary, setUpdatedSalary] = useState(salary);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSalary((prevSalary) => ({
      ...prevSalary,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedSalary); // Call the update function passed as prop
  };

  return (
    <div className="p-4 border border-gray-300 mb-4">
      <h2 className="text-xl font-bold mb-4">Update Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Employee Name</label>
          <input
            type="text"
            name="employeeName"
            value={updatedSalary.employeeName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Base Salary</label>
          <input
            type="number"
            name="baseSalary"
            value={updatedSalary.baseSalary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">OT Hours</label>
          <input
            type="number"
            name="otHours"
            value={updatedSalary.otHours}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Allowances</label>
          <input
            type="number"
            name="allowances"
            value={updatedSalary.allowances}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Department</label>
          <input
            type="text"
            name="department"
            value={updatedSalary.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSalaryForm;
