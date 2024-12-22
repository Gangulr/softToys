// controllers/NotificationController.js
import NotificationModel from "../models/NotificationModel.js";

// Fetch all notifications for HR
export const fetchNotifications = async (req, res) => {
    try {
      // Fetch notifications sorted by creation date (most recent first)
      const notifications = await NotificationModel.find().sort({ createdAt: -1 });
  
      console.log('Notifications fetched:', notifications);
  
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ msg: "Failed to fetch notifications", error: error.message });
    }
  };
  

// Approve or Reject a Leave Request
export const updateLeaveStatus = async (req, res) => {
    try {
        const { id, action } = req.params;

        // Find the notification and update its status
        const notification = await NotificationModel.findById(id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        if (action === 'approve') {
            notification.status = 'approved';
        } else if (action === 'reject') {
            notification.status = 'rejected';
        } else {
            return res.status(400).json({ msg: 'Invalid action' });
        }

        await notification.save();
        res.json({ msg: `Leave request ${action}ed successfully` });
    } catch (error) {
        console.error('Error updating leave request:', error);
        res.status(500).json({ msg: 'Failed to update leave request', error: error.message });
    }
};
