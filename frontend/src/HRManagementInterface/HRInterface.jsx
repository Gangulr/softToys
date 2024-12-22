import React, { useState, useEffect } from 'react';
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Link } from "react-router-dom";
import Hr from '../image/gangul2.png';

function HRinterface() {
  const [attendanceData, setAttendanceData] = useState({ presentCount: 0, absentCount: 0 });
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today's date

  // Fetch attendance count on component mount and when the date changes
  useEffect(() => {
    fetchAttendanceData();
  }, [date]);

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(`/api/attendance/work-hours?date=${date}`);
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen font-poppins bg-gradient-to-br from-purple-100 via-white to-pink-50">
      <Header />
      
      <div className="flex-1 flex justify-center items-center bg-pink-100 rounded-3xl shadow-xl mx-16 my-8 border border-gray-200">
        {/* Content Section */}
        <div className="max-w-lg text-left space-y-6 p-10">
          <h1 className="text-5xl font-extrabold text-purple-600 mb-4">HR Management</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The HR Management System streamlines salary management, attendance tracking, and leave requests by automating payroll, real-time attendance tracking, and online leave submissions. It enhances HR efficiency and ensures accurate management of essential functions.
          </p>
          
          {/* Navigation Buttons */}
          <div className="space-y-4">
            <Link to="dashboard">
            
              <br></br>
              <br></br>
            </Link>
            <Link to="addemp">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Add Employee
              </button>
              <br></br>
              <br></br>
            </Link>
            <Link to="leaveform">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Leave Request Form
              </button>
              <br></br>
              <br></br>
            </Link>
            <Link to="salarymang">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Salary Details Form
              </button>
              <br></br>
              <br></br>
            </Link>
            <Link to="attendancetrack">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Attendance Form
              </button>
              <br></br>
              <br></br>
            </Link>
            <Link to="hr-report">
              <button className="w-full py-1 px-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-300 to-purple-300 rounded-full hover:from-pink-200 hover:to-purple-200 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
                Report
              </button>
              <br></br>
              <br></br>
            </Link>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="hidden lg:block w-1/3 max-w-xl">
          <img
            src={Hr}
            alt="HR Illustration"
            className="w-full h-auto rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
            style={{ maxHeight: '300px' }} // Set a max height for the image
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HRinterface;
