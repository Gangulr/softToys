import mongoose from 'mongoose';

const ProductionCostSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  materialCost: {
    type: Number,
    required: true,
    min: 0,
  },
  laborCost: {
    type: Number,
    required: true,
    min: 0,
  },
  overheadCost: {
    type: Number,
    required: true,
    min: 0,
  },
  waterCost: {
    type: Number,
    required: true,
    min: 0,
  },
  currentBill: {
    type: Number,
    required: true,
    min: 0,
  },
  totalCost: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('ProductionCost', ProductionCostSchema);
