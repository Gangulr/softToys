import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
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
});

export default mongoose.model("Order", OrderSchema);
