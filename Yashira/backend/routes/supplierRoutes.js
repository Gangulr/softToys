const express = require('express');
const Supplier = require('../models/Supplier'); 
const router = express.Router();


router.post('/suppliers', async (req, res) => {
  const { name, companyName, itemCategory, deliveryType, contactInfo, address } = req.body;

  if (!name || !companyName || !itemCategory || !deliveryType || !contactInfo.email || !contactInfo.phone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newSupplier = new Supplier({
      name,
      companyName, // New field
      itemCategory, // New field
      deliveryType, // New field
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



router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find({}); 
    res.status(200).json({ suppliers }); 
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers' });
  }
});

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


module.exports = router;
