// controllers/LeaveReqcontrol.js
import LeaveReqModel from "../models/LeaveReqModel.js";
import NotificationModel from "../models/NotificationModel.js";

// Fetch all leave records
export const fetchAllLeave = async (req, res) => {
    try {
        const leaveRecords = await LeaveReqModel.find();
        res.json(leaveRecords);
    } catch (error) {
        console.error('Error fetching leave records:', error);
        res.status(500).json({ msg: 'Failed to fetch leave records', error: error.message });
    }
};

// Add a new leave request
export const addLeaveRequest = async (req, res) => {
  try {
    const { empId, name, startDate, endDate, reason, type } = req.body;

    // Validation checks
    if (!empId || !name || !startDate || !endDate || !reason || !type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save the new leave request
    const leaveRequest = new LeaveReqModel({
      empId,
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      type,
    });

    await leaveRequest.save();

    console.log('Leave request saved successfully:', leaveRequest);

    // Create a notification after saving the leave request
    const notification = new NotificationModel({
      message: `New leave request from ${name} (${empId}) for ${type}.`,
      empId,
      type,
    });

    await notification.save();

    console.log('Notification created successfully:', notification);

    // Send response to the client
    res.status(201).json({ msg: "Leave request and notification added successfully" });
  } catch (error) {
    console.error("Error adding leave request and notification:", error);
    res.status(500).json({ msg: "Failed to add leave request", error: error.message });
  }
};

// Update a leave request by ID
export const updateLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;  // ID from the request URL
        const updatedData = req.body;  // Data to update from the request body

        // Find the leave request by ID and update it
        const updatedLeave = await LeaveReqModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Validate the updated data
        });

        if (!updatedLeave) {
            return res.status(404).json({ msg: 'Leave request not found' });
        }

        res.json({ msg: 'Leave request updated successfully', leave: updatedLeave });
    } catch (error) {
        console.error('Error updating leave request:', error);
        res.status(500).json({ msg: 'Failed to update leave request', error: error.message });
    }
};

// Delete a leave request by ID
export const deleteLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;  // ID from the request URL

        // Find the leave request by ID and delete it
        const deletedLeave = await LeaveReqModel.findByIdAndDelete(id);

        if (!deletedLeave) {
            return res.status(404).json({ msg: 'Leave request not found' });
        }

        res.json({ msg: 'Leave request deleted successfully' });
    } catch (error) {
        console.error('Error deleting leave request:', error);
        res.status(500).json({ msg: 'Failed to delete leave request', error: error.message });
    }
};
