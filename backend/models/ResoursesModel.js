import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
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
    enum: ['In Stock', 'Out of Stock', 'Reserved'],
    default: 'In Stock',
  },
});

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;
