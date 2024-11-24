import FinishingGoodsModel from '../models/FinishingGoodsModel.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await FinishingGoodsModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await FinishingGoodsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Add a new product
export const createProduct = async (req, res) => {
    console.log("req111",req.body)
  try {
    const { productName, quantity, unitPrice, dateManufactured ,totalValue} = req.body;
    const newProduct = new FinishingGoodsModel({
      productName,
      quantity,
      unitPrice,
      dateManufactured,
      totalValue
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { productName, quantity, unitPrice, dateManufactured } = req.body;
    const updatedProduct = await FinishingGoodsModel.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        quantity,
        unitPrice,
        dateManufactured,
        totalValue: quantity * unitPrice
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await FinishingGoodsModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};
