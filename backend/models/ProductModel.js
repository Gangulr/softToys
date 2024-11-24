import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productionDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['In Progress', 'On Hold', 'Completed', ],
    default: 'In Progress',
  },
  batch: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['In Progress', 'On Hold', 'Done'],
        default: 'In Progress',
      },
    },
  ],
});

export default mongoose.model('Production', ProductSchema);