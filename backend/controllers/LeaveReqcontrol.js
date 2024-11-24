import LeaveReqModel from "../models/LeaveReqModel.js"; // Ensure path is correct

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

export const addLeaveRequest = async (req, res) => {
    try {
        console.log(req.body); // Use req.body for POST data
        const { empId, name, startDate, endDate, reason, type, createdAt } = req.body;

        // Validation checks using a switch statement
        switch (true) {
            case !empId:
                return res.status(400).json({ error: "Employee ID is required" });
            case !name:
                return res.status(400).json({ error: "Employee name is required" });
            case !startDate:
                return res.status(400).json({ error: "Start date is required" });
            case !endDate:
                return res.status(400).json({ error: "End date is required" });
            case !reason:
                return res.status(400).json({ error: "Reason for leave is required" });
            case !type:
                return res.status(400).json({ error: "Leave type is required" });
        }

        // Create a new leave request using the model
        const leaveRequest = new LeaveReqModel({
            empId,
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            type,
            createdAt: createdAt ? new Date(createdAt) : undefined
        });

        // Save the leave request to the database
        await leaveRequest.save();

        // Respond with a success message
        res.status(201).json({ msg: "Leave request added successfully" });

    } catch (error) {
        console.error('Error adding leave request:', error);
        res.status(500).json({ msg: "Leave request adding failed", error: error.message });
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
  
