// backend/routes/cartRoutes.js

import express from 'express';
import {
    createCart,
    getCart,
    updateCart,
    deleteCart
} from '../controllers/cartController.js';

const CartRoute = express.Router();

// Fetch all cart entries
CartRoute.get("/", getCart);

// Add a new cart entry
CartRoute.post("/", express.json(), createCart);

// Update an existing cart entry by ID
CartRoute.put("/:cartId", express.json(), updateCart);

// Delete a cart entry by ID
CartRoute.delete("/:cartId", deleteCart);

export default CartRoute;
