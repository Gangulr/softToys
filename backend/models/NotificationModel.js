import mongoose from 'mongoose';

// Define the schema for notifications
const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Notification', NotificationSchema);
