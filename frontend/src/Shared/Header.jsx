import React, { useState } from 'react';
import './Header.css';
import logo from '../image/logo.png';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUserClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src={logo} alt="Bear Works Lanka Logo" />
            <h1>Bear Works Lanka</h1>
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#users" onClick={handleUserClick}>Users</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#finance">Finance</a></li>
              <li><a href="#feedbacks">Feedbacks</a></li>
            </ul>
          </nav>
          <div className="logout-container">
            <button className="logout-button">Log Out</button>
          </div>
        </div>
      </header>

      <div className="flex flex-grow">
        <div
          className={`sidebar-container fixed top-16 left-0 h-auto w-48 bg-gray-800 text-white transition-transform duration-300 ${
            isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
        >
          <div className="sidebar-header flex justify-between items-center p-2 bg-gray-900">
            <h2 className="text-sm font-bold">Dashboard</h2>
            <button onClick={handleCloseSidebar} className="text-white">X</button>
          </div>
          <ul className="mt-2">
            <li className="sidebar-item p-2 hover:bg-gray-700">Dashboard Home</li>
            <li className="sidebar-item p-2 hover:bg-gray-700">Profile</li>
            <li className="sidebar-item p-2 hover:bg-gray-700">Settings</li>
            <li className="sidebar-item p-2 hover:bg-gray-700">Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;