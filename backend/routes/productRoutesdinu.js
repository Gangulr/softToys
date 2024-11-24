// backend/routes/productRoutes.js

import express from 'express';
import {
    addProduct,
    fetchAllProducts,
    updateProduct,
    deleteProduct
}  from '../controllers/productControllerdinu.js';

const ProductRoute = express.Router();

// Fetch all product entries
ProductRoute.get("/", fetchAllProducts);

// Add a new product entry
ProductRoute.post("/", express.json(), addProduct);

// Update an existing product entry by ID
ProductRoute.put("/:productId", express.json(), updateProduct);

// Delete a product entry by ID
ProductRoute.delete("/:productId", deleteProduct);

export default ProductRoute;
