import mongoose from 'mongoose';

// Define the schema for orders with embedded order items
const orderSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Allow only letters, numbers, spaces, and '/' characters
        return /^[a-zA-Z0-9/, ]*$/.test(v);
      },
    },
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
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
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
}, { timestamps: true });

// Create the Order model based on the schema
const BillOrder = mongoose.model('BillOrder', orderSchema);

export default BillOrder;
