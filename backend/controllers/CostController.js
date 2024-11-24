import ProductionCost from '../models/productioncostModel.js';

// Get all production costs
export const fetchAllProductionCosts = async (req, res) => {
  try {
    const costs = await ProductionCost.find();
    res.status(200).json(costs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new production cost
export const createProductionCost = async (req, res) => {
  const { productName, materialCost, laborCost, overheadCost, waterCost, currentBill, totalCost } = req.body;

  const newCost = new ProductionCost({
    productName,
    materialCost,
    laborCost,
    overheadCost,
    waterCost,
    currentBill,
    totalCost,
  });

  try {
    const savedCost = await newCost.save();
    res.status(201).json(savedCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a production cost by ID
export const updateProductionCost = async (req, res) => {
  try {
    const updatedCost = await ProductionCost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCost) return res.status(404).json({ message: 'Production cost not found' });
    res.status(200).json(updatedCost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a production cost by ID
export const deleteProductionCost = async (req, res) => {
  try {
    const deletedCost = await ProductionCost.findByIdAndDelete(req.params.id);
    if (!deletedCost) return res.status(404).json({ message: 'Production cost not found' });
    res.status(200).json({ message: 'Production cost deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
