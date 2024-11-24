import express from "express";
import {
    fetchAllLeave,
    addLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest
} from "../controllers/LeaveReqcontrol.js";  // Ensure the correct path and case

const LeaveReqRoutes = express.Router();

// Route to fetch all leave requests
LeaveReqRoutes.get("/", fetchAllLeave);

// Route to add a new leave request
LeaveReqRoutes.post("/", express.json(), addLeaveRequest);

// Route to update a leave request by ID
LeaveReqRoutes.put("/:id", express.json(), updateLeaveRequest);

// Route to delete a leave request by ID
LeaveReqRoutes.delete("/:id", deleteLeaveRequest);

export default LeaveReqRoutes;
