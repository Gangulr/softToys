import express from 'express';
import Supplier from '../models/Supplier.js'; 
const router = express.Router();

// Create a new supplier
router.post('/suppliers', async (req, res) => {
  const { name, companyName, itemCategory, deliveryType, contactInfo, address } = req.body;

  if (!name || !companyName || !itemCategory || !deliveryType || !contactInfo?.email || !contactInfo?.phone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newSupplier = new Supplier({
      name,
      companyName,
      itemCategory,
      deliveryType,
      contactInfo,
      address,
    });

    await newSupplier.save();

    res.status(201).json({ message: 'Supplier registered successfully', supplier: newSupplier });
  } catch (error) {
    console.error('Error registering supplier:', error);
    res.status(500).json({ message: 'Error registering supplier' });
  }
});

// Get all suppliers
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.status(200).json({ suppliers });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers' });
  }
});

// Update a supplier by ID
router.put('/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, companyName, itemCategory, deliveryType, contactInfo, address } = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { name, companyName, itemCategory, deliveryType, contactInfo, address },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier' });
  }
});

// Delete a supplier by ID
router.delete('/suppliers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Error deleting supplier' });
  }
});

// Export the router
export default router;
