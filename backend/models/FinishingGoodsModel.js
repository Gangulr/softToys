import mongoose from 'mongoose';

const FinishingGoodsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  dateManufactured: { type: Date, required: true },
  totalValue: { type: Number, required: true },
});

// Middleware to auto-populate totalValue based on quantity and unitPrice before saving
FinishingGoodsSchema.pre('save', function (next) {
  this.totalValue = this.quantity * this.unitPrice;
  next();
});

export default mongoose.model('FinishingGoods', FinishingGoodsSchema);
