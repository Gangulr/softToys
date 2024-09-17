import React from 'react'
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { Link } from "react-router-dom";
import "./OrderandProduction.css"; // Import the CSS file
import ui from '../image/1.png'; // Import the image



function OrderAndProduction() {
  return (
    <div className="orderandproduction">
      <Header />
      <div>
      {/* Scrollable Body */}
        <div className="scrollableBody">
    
          <div className="content">
            <h1 className="title">Order And Production</h1>
            <p className="description">
            The Order and Production Interface allows you to efficiently manage orders and streamline production workflows.
             Track each order from start to finish while optimizing production schedules and inventory, all in one cohesive system.
            </p>
           <Link to="order">
              <button className="ctaButton">Order</button>
              <br></br>
              <br></br>
              </Link>
            <Link to="production">
              <button className="ctaButton">Production</button>
              <br></br>
              <br></br>
            </Link>
            <Link to="resources">
              <button className="ctaButton">Resource plan</button>
              <br></br>
              <br></br>
            </Link>
            <Link to="report">
              <button className="ctaButton">Report</button>
            </Link>
            
          </div>
          <div className="illustration">
            <img
            src={ui}
              alt="Finance Illustration"
              className="illustrationImage"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default OrderAndProduction
