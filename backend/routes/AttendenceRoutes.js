import express from 'express';
import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from '../controllers/AttendenceController.js'; // Adjust the path as necessary

const router = express.Router();

// Route to create a new attendance record
router.post('/', createAttendance);

// Route to get all attendance records
router.get('/', getAllAttendance);

// Route to get a specific attendance record by employee ID and date
router.get('/:empId/:date', getAttendanceById);

// Route to update an attendance record by employee ID and date
router.put('/:empId/:date', updateAttendance);

// Route to delete an attendance record by employee ID and date
router.delete('/:empId/:date', deleteAttendance);

export default router;
