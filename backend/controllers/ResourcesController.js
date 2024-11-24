import Resource from '../models/ResoursesModel.js';

// Add a new resource
export const addResources = async (req, res) => {
  try {
    const newResources = req.body;

    // Validate required fields
    const resourcesWithValidation = newResources.map(resource => {
      if (!resource.name || !resource.date || resource.quantity < 0) {
        throw new Error("Validation failed for one or more resources");
      }
      return { ...resource };
    });

    const savedResources = await Resource.insertMany(resourcesWithValidation);
    res.status(201).json({ message: "Resources added successfully", savedResources });
  } catch (error) {
    res.status(400).json({ message: "Failed to add resources", error: error.message });
  }
};

// Fetch all resources
export const fetchAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error: error.message });
  }
};

// Fetch a resource by ID
export const fetchResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.resourceId);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing resource
export const updateResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(req.params.resourceId, req.body, { new: true });
    if (!updatedResource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a resource
export const deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.resourceId);
    if (!deletedResource) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
