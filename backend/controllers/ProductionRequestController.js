import ProductionRequest from '../models/ProductionRequest.js'; // Adjust to match your model

// Get all production requests
export const getProductionRequests = async (req, res) => {
  try {
    const requests = await ProductionRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching production requests', error });
  }
};

// Create a new production request
export const createProductionRequest = async (req, res) => {
  const { date, productName, quantity, comments } = req.body;
  const newRequest = new ProductionRequest({ date, productName, quantity, comments });

  try {
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating production request', error });
  }
};

// Update an existing production request
export const updateProductionRequest = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRequest = await ProductionRequest.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating production request', error });
  }
};

// Delete a production request
export const deleteProductionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRequest = await ProductionRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting production request', error });
  }
};
