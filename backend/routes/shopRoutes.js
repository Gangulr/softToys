// shopRoutes.js

import express from 'express';
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} from '../controllers/shopController.js';

const router = express.Router();  // Use lowercase for consistency

// Fetch all shops
router.get("/", getAllShops);

// Add a new shop
router.post("/", express.json(), createShop);

// Get a specific shop by ID
router.get("/:id", getShopById);

// Update a shop by ID
router.put("/:id", express.json(), updateShop);

// Delete a shop by ID
router.delete("/:id", deleteShop);

export default router;
