import mongoose from 'mongoose';

const monthlyValuationSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  totalRawMaterials: {
    type: Number,
    required: true,
    default: 0,
  },
  totalFinishedGoods: {
    type: Number,
    required: true,
    default: 0,
  },
  totalInventory: {
    type: Number,
    required: true,
  },
});

// Middleware to auto-calculate totalInventory before saving
monthlyValuationSchema.pre('save', function (next) {
  this.totalInventory = this.totalRawMaterials + this.totalFinishedGoods;
  next();
});

export default mongoose.model('MonthlyValuation', monthlyValuationSchema);
