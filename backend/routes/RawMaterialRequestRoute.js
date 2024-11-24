import express from 'express';
import {
  getRawMaterialRequests,
  getRawMaterialRequestById,
  createRawMaterialRequest,
  updateRawMaterialRequest,
  deleteRawMaterialRequest,
} from '../controllers/RawMaterialRequestController.js';

const router = express.Router();

// Get all raw material requests
router.get('/', getRawMaterialRequests);

// Get a raw material request by ID
router.get('/:id', getRawMaterialRequestById);

// Add a new raw material request
router.post('/', createRawMaterialRequest);

// Update a raw material request by ID
router.put('/:id', updateRawMaterialRequest);

// Delete a raw material request by ID
router.delete('/:id', deleteRawMaterialRequest);

export default router;
