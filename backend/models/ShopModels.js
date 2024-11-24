import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

const ShopSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Use UUID for unique IDs
  },
  shopName: {
    type: String,
    required: [true, 'Shop name is required'], // Custom error message
    trim: true,
    unique: true, // Ensure uniqueness of shop names
  },
  shopAddress: {
    type: String,
    required: [true, 'Shop address is required'], // Custom error message
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'], // Custom error message
    match: [/^\d+$/, 'Contact number should only contain digits'], // Only digits
    minlength: [10, 'Contact number must be at least 10 digits long'], // Minimum length validation
    maxlength: [15, 'Contact number cannot exceed 15 digits'], // Maximum length validation
  },
  email: {
    type: String,
    required: [true, 'Email is required'], // Custom error message
    unique: true, // Ensure email uniqueness
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'], // Basic email format validation
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const ShopModel = mongoose.model('NewShop', ShopSchema);
export default ShopModel;
