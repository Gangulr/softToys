import express from 'express';
import {
  getMonthlyValuations,
  getMonthlyValuationById,
  createMonthlyValuation,
  updateMonthlyValuation,
  deleteMonthlyValuation,
} from '../controllers/MonthlyEvalutionController.js';

const router = express.Router();

// Get all monthly valuations
router.get('/', getMonthlyValuations);

// Get a monthly valuation by ID
router.get('/:id', getMonthlyValuationById);

// Add a new monthly valuation
router.post('/create', createMonthlyValuation);

// Update a monthly valuation by ID
router.put('/:id', updateMonthlyValuation);

// Delete a monthly valuation by ID
router.delete('/:id', deleteMonthlyValuation);

export default router;
