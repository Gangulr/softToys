import mongoose from 'mongoose';

// Create a schema for Attendance
const attendanceSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    length: 5,
    match: /^\d{5}$/, // Regular expression to ensure 5 digits
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clockIn: {
    type: String,
    required: true,
  },
  clockOut: {
    type: String,
    required: true,
  },
  present: {
    type: Boolean,
    default: false,
  },
});

// Create a model from the schema
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Export the model
export default Attendance;
