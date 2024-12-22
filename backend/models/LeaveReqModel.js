// models/LeaveReqModel.js
import mongoose from "mongoose";

// Define the schema for a leave request
const LeaveRequestSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    trim: true
    
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Annual Leave', 'Sick Leave', 'Maternity Leave'], // You can add more leave types here
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("LeaveReq", LeaveRequestSchema);
