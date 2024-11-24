import mongoose from 'mongoose';

const rawMaterialRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  materialName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['InStock', 'LowStock', 'OutOfStock'],
    required: true,
    default: 'Pending',
  },
  comments: {
    type: String,
    required: true,
    default: '',
  },
});

export default mongoose.model('RawMaterialRequest', rawMaterialRequestSchema);
