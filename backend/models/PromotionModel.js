import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

const promotionSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 }, // UUID for unique ID
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const PromotionModel = mongoose.model('Promotion', promotionSchema);
export default PromotionModel;
