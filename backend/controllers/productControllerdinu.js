import ProductModel from "../models/productModeldinu.js";

// Fetch all products
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ msg: "Failed to retrieve products", error: error.message });
    }
};

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, size, quantity } = req.body;

        // Validation checks
        if (!name || !price || !description || !size || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const product = new ProductModel({ 
            name, 
            price, 
            description, 
            size, 
            quantity,
        });

        await product.save();
        res.status(201).json({ msg: "Product added successfully", product });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ msg: "Failed to add product", error: error.message });
    }
};

// Update an existing product
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ msg: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ msg: "Failed to update product", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ msg: "Product deleted successfully", deletedProduct });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ msg: "Failed to delete product", error: error.message });
    }
};
