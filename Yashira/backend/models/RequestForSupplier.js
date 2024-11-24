const mongoose = require('mongoose');

const RequestForSupplierSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  orderDate: { type: Date, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      description: { type: String }
    }
  ],
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }, 
  isPaymentDone: { type: Boolean, default: false }, 
  paymentValue: { type: Number, default: 0 }
});

module.exports = mongoose.model('RequestForSupplier', RequestForSupplierSchema);
