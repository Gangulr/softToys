import Material from '../models/RawMaterialModel.js';

// Get all materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
};

// Get a material by ID
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching material' });
  }
};

// Add a new material
export const createMaterial = async (req, res) => {
  try {
    const { materialName, quantity, unitPrice, unitMeasurement } = req.body;
    const totalValue = quantity * unitPrice;

    const newMaterial = new Material({
      materialName,
      quantity,
      unitPrice,
      totalValue,
      unitMeasurement,
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error creating material', error });
  }
};

// Update a material by ID
export const updateMaterial = async (req, res) => {
  try {
    const { materialName, quantity, unitPrice, unitMeasurement } = req.body;
    const totalValue = quantity * unitPrice;

    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      { materialName, quantity, unitPrice, totalValue, unitMeasurement },
      { new: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }

    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating material', error });
  }
};

// Delete a material by ID
export const deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await Material.findByIdAndDelete(req.params.id);

    if (!deletedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }

    res.status(200).json({ message: 'Material deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting material' });
  }
};
