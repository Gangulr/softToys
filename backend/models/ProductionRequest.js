import mongoose from 'mongoose';

const productionRequestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  comments: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('ProductionRequest', productionRequestSchema);
