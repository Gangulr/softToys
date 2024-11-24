import Production from '../models/ProductModel.js';

export const addProduction = async (req, res) => {
  try {
    const newProduction = new Production(req.body);
    await newProduction.save();
    res.status(201).json(newProduction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchAllProductions = async (req, res) => {
  try {
    const productions = await Production.find();
    res.status(200).json(productions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.productionId);
    if (!production) return res.status(404).json({ message: 'Production not found' });
    res.status(200).json(production);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndUpdate(req.params.productionId, req.body, { new: true });
    if (!production) return res.status(404).json({ message: 'Production not found' });
    res.status(200).json(production);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndDelete(req.params.productionId);
    if (!production) return res.status(404).json({ message: 'Production not found' });
    res.status(200).json({ message: 'Production deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};