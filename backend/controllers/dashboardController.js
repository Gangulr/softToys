import Employee from '../models/AddEmployeeModel.js';

export const getDashboardCounts = async (req, res) => {
  try {
    const employeeCount = await Employee.countDocuments();
    console.log('Employee Count:', employeeCount);

    const leaveRequestCount = await LeaveRequest.countDocuments();
    console.log('Leave Request Count:', leaveRequestCount);

    const attendanceCount = await Attendance.countDocuments({ status: 'Present' });
    console.log('Attendance Count:', attendanceCount);

    res.status(200).json({
      employeeCount,
      leaveRequestCount,
      attendanceCount,
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Error fetching counts', error: error.message });
  }
};

