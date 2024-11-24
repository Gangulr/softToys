import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { FaTachometerAlt, FaShoppingCart, FaUserTie, FaClipboardList } from 'react-icons/fa'; // Import new icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Navigation Links */}
      <nav className="nav-links">
        <NavLink
          exact
          to="/dashbord"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaTachometerAlt className="nav-icon" /> Dashboard
        </NavLink>

        <NavLink
          to="/supplier"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaUserTie className="nav-icon" /> Supplier
        </NavLink>

        <NavLink
          to="/supplier-list"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaClipboardList className="nav-icon" /> Supplier List
        </NavLink>

        <NavLink
          to="/make-order"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaShoppingCart className="nav-icon" /> Make Order
        </NavLink>

        <NavLink
          to="/order-list"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaClipboardList className="nav-icon" /> Order List
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
