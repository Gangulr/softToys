import MonthlyValuation from '../models/MonthlyEvalutionModel.js';

// Get all monthly valuations
export const getMonthlyValuations = async (req, res) => {
  try {
    const valuations = await MonthlyValuation.find();
    res.status(200).json(valuations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching valuations' });
  }
};

// Get a monthly valuation by ID
export const getMonthlyValuationById = async (req, res) => {
  try {
    const valuation = await MonthlyValuation.findById(req.params.id);
    if (!valuation) {
      return res.status(404).json({ message: 'Monthly valuation not found' });
    }
    res.status(200).json(valuation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching valuation' });
  }
};

// Add a new monthly valuation
export const createMonthlyValuation = async (req, res) => {
    console.log("req",req.body)
  try {
    const { month, totalRawMaterials, totalFinishedGoods,totalInventory } = req.body;
    const newValuation = new MonthlyValuation({
      month,
      totalRawMaterials,
      totalFinishedGoods,
      totalInventory
    });

    await newValuation.save();
    res.status(201).json(newValuation);
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

// Update a monthly valuation by ID
export const updateMonthlyValuation = async (req, res) => {
  try {
    const { month, totalRawMaterials, totalFinishedGoods } = req.body;
    const updatedValuation = await MonthlyValuation.findByIdAndUpdate(
      req.params.id,
      {
        month,
        totalRawMaterials,
        totalFinishedGoods,
        totalInventory: totalRawMaterials + totalFinishedGoods,
      },
      { new: true }
    );

    if (!updatedValuation) {
      return res.status(404).json({ message: 'Monthly valuation not found' });
    }

    res.status(200).json(updatedValuation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating valuation' });
  }
};

// Delete a monthly valuation by ID
export const deleteMonthlyValuation = async (req, res) => {
    console.log("req",req.params.id)
  try {
    const deletedValuation = await MonthlyValuation.findByIdAndDelete(req.params.id);

    if (!deletedValuation) {
      return res.status(404).json({ message: 'Monthly valuation not found' });
    }

    res.status(200).json({ message: 'Monthly valuation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting valuation' });
  }
};
