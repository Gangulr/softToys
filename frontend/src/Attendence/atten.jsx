import React, { useState, useEffect } from 'react';

const AttendanceForm = () => {
  const [attendance, setAttendance] = useState({
    empId: '',
    date: '',
    clockIn: '',
    clockOut: '',
    present: false,
  });

  const [attendances, setAttendances] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (editIndex !== null) {
      // If an index is set for editing, update the attendance at that index
      const updatedAttendances = attendances.map((att, index) =>
        index === editIndex ? attendance : att
      );
      setAttendances(updatedAttendances);
      setEditIndex(null); // Clear the edit mode
    } else {
      // Otherwise, add a new attendance
      setAttendances([...attendances, attendance]);
    }

    // Reset the form
    setAttendance({
      empId: '',
      date: '',
      clockIn: '',
      clockOut: '',
      present: false,
    });
  };

  // Handle input changes for text, date, and time inputs
  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  // Handle checkbox input changes
  const handleCheckboxChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.checked });
  };

  // Edit an attendance record
  const handleEdit = (index) => {
    setAttendance(attendances[index]); // Load the selected attendance into the form
    setEditIndex(index); // Set the index for editing
  };

  // Delete an attendance record
  const handleDelete = (index) => {
    const updatedAttendances = attendances.filter((_, i) => i !== index);
    setAttendances(updatedAttendances);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Retrieve stored attendances from localStorage when the component mounts
  useEffect(() => {
    const storedAttendances = localStorage.getItem('attendances');
    if (storedAttendances) {
      setAttendances(JSON.parse(storedAttendances));
    }
  }, []);

  // Store the updated attendances in localStorage when the attendances state changes
  useEffect(() => {
    localStorage.setItem('attendances', JSON.stringify(attendances));
  }, [attendances]);

  // Filter attendances based on the search query
  const filteredAttendances = attendances.filter((att) =>
    att.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Attendance Tracking Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empId">
            Employee ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="empId"
            name="empId"
            type="text"
            value={attendance.empId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            name="date"
            type="date"
            value={attendance.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clockIn">
            Clock In
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="clockIn"
            name="clockIn"
            type="time"
            value={attendance.clockIn}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clockOut">
            Clock Out
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="clockOut"
            name="clockOut"
            type="time"
            value={attendance.clockOut}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="present">
            Present
          </label>
          <input
            className="mr-2 leading-tight"
            id="present"
            name="present"
            type="checkbox"
            checked={attendance.present}
            onChange={handleCheckboxChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {editIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>

      <h2 className="text-lg font-bold mb-4 mt-8">Search Attendances</h2>
      <input
        type="text"
        placeholder="Search by Employee ID"
        value={searchQuery}
        onChange={handleSearchChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <h2 className="text-lg font-bold mb-4">Attendances</h2>
      <ul>
        {filteredAttendances.map((attendance, index) => (
          <li key={index} className="mb-4">
            <p>Employee ID: {attendance.empId}</p>
            <p>Date: {attendance.date}</p>
            <p>Clock In: {attendance.clockIn}</p>
            <p>Clock Out: {attendance.clockOut}</p>
            <p>Present: {attendance.present ? 'Yes' : 'No'}</p>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceForm;
