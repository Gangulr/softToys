import RawMaterialRequest from '../models/RawMaterialRequest.js';

// Get all raw material requests
export const getRawMaterialRequests = async (req, res) => {
  try {
    const requests = await RawMaterialRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw material requests' });
  }
};

// Get a raw material request by ID
export const getRawMaterialRequestById = async (req, res) => {
  try {
    const request = await RawMaterialRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Raw material request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw material request' });
  }
};

// Add a new raw material request
export const createRawMaterialRequest = async (req, res) => {
  try {
    const { date, materialName, quantity, status, comments } = req.body;

    const newRequest = new RawMaterialRequest({
      date,
      materialName,
      quantity,
      status,
      comments,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating raw material request' });
  }
};

// Update a raw material request by ID
export const updateRawMaterialRequest = async (req, res) => {
    console.log("req",req.body)
  try {
    const { date, materialName, quantity, status, comments } = req.body;

    const updatedRequest = await RawMaterialRequest.findByIdAndUpdate(
      req.params.id,
      { date, materialName, quantity, status, comments },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Raw material request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating raw material request' });
  }
};

// Delete a raw material request by ID
export const deleteRawMaterialRequest = async (req, res) => {
  try {
    const deletedRequest = await RawMaterialRequest.findByIdAndDelete(req.params.id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Raw material request not found' });
    }

    res.status(200).json({ message: 'Raw material request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting raw material request' });
  }
};
