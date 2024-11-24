import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

const productSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 }, // UUID for unique ID
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
