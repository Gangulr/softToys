import mongoose from 'mongoose';

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is at least 1
      price: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  shopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  total: { type: Number, required: true }, // Total amount for the order
  discount: { type: Number, required: true, default: 0 }, // Default discount to 0
});

// Create and export the Cart model
const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;
