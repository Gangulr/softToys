// routes/NotificationRoutes.js
import express from "express";
import {
    fetchNotifications,
    updateLeaveStatus,
} from "../controllers/NotificationController.js";

const NotificationRoutes = express.Router();

// Route to fetch notifications
NotificationRoutes.get("/", fetchNotifications);

// Route to create a new notification
NotificationRoutes.post("/", async (req, res) => {
    try {
        const notification = new NotificationModel(req.body); // Create a new notification
        await notification.save(); // Save it to the database
        res.status(201).json(notification); // Respond with the created notification
    } catch (error) {
        res.status(400).json({ message: "Failed to create notification", error }); // Handle any errors
    }
});

// Route to approve or reject a leave request
NotificationRoutes.put("/:id/:action", updateLeaveStatus); // action can be 'approve' or 'reject'

export default NotificationRoutes;
