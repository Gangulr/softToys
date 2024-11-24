//import mongoose from 'mongoose';
import Attendance from '../models/AttendenceModel.js'; // Adjust the import path as necessary

// Create a new attendance record
export const createAttendance = async (req, res) => {
  const { empId, date, clockIn, clockOut, present } = req.body;

  // Validate required fields
  if (!empId || !date || typeof present !== 'boolean') {
    return res.status(400).json({ message: 'Employee ID, date, and present status are required' });
  }

  try {
    const attendance = new Attendance(req.body);
    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific attendance record by employee ID and date
export const getAttendanceById = async (req, res) => {
  const { empId, date } = req.params;

  try {
    // Validate the date format if needed
    const attendance = await Attendance.findOne({ empId, date: new Date(date) });
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an attendance record by employee ID and date
export const updateAttendance = async (req, res) => {
  const { empId, date } = req.params;

  try {
    // Validate the date format if needed
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { empId, date: new Date(date) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attendance record by employee ID and date
export const deleteAttendance = async (req, res) => {
  const { empId, date } = req.params;

  try {
    const deletedAttendance = await Attendance.findOneAndDelete({ empId, date: new Date(date) });
    if (!deletedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
