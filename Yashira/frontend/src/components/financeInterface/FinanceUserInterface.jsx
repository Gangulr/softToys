import React from "react";
import { Link } from "react-router-dom";
import "./financeuserinterface.css"; // Import the CSS file
import supp from "../../assets/supp.jpeg"; // Import the image

function FinanceUserInterface() {
  return (
    <div className="financeInterfacePage">
      <div className="financeInterface">
        {/* Scrollable Body */}
        <div className="scrollableBody">
          <div className="content">
            <h1 className="title">Supplier Management</h1>
            <p className="description">
            The Supplier Management System streamlines supplier relationships by automating onboarding,
             managing supplier data, tracking performance, and handling purchase orders. 
             It ensures smooth communication, monitors order fulfillment, and supports payment processing,
              with reporting tools for effective supplier management.
            </p>
            <Link to="/dashbord">
              <button className="ctaButton">Supplier Details</button>
              <br></br>
              <br></br>
            </Link>
            <Link to="order-list">
              <button className="ctaButton">Bill Generation</button>
              <br></br>
              <br></br>
            </Link>
            <Link to="make-order">
              <button className="ctaButton">Order Creation</button>
              <br></br>
              <br></br>
            </Link>
          </div>
          <div className="illustration">
            <img
              src={supp}
              alt="Finance Illustration"
              className="illustrationImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceUserInterface;
