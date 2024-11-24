import mongoose from 'mongoose';

const RawMaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalValue: {
    type: Number,
    required: true,
    min: 0,
  },
  unitMeasurement: {
    type: String,
    required: true,
    enum: ['meter', 'cm', 'yard', 'kilogram', 'piece'], // Add the valid measurement units
  },
});

const Material = mongoose.model('RawMaterial', RawMaterialSchema);
export default Material;
