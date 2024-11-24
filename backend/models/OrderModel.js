import mongoose from 'mongoose'; 
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

const OrderSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 }, // UUID for unique ID
    shopName: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Completed"],
    },
    address: { // New address field
        type: String,
        required: true, // You can set this to false if the address is optional
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
