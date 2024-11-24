const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: { 
    type: String,
    required: true,
  },
  itemCategory: { 
    type: String,
    required: true,
  },
  deliveryType: { 
    type: String,
    enum: ['Delivery by Supplier', 'Pickup by Us'], 
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
