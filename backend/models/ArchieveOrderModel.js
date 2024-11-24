// models/ArchivedOrder.js
const mongoose = require('mongoose');

const archivedOrderSchema = new mongoose.Schema({
  shopName: String,
  orderDate: Date,
  status: String,
  orderItems: [
    {
      name: String,
      quantity: Number,
    },
  ],
  archivedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ArchivedOrder', archivedOrderSchema);
