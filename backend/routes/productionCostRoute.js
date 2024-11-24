import express from 'express';
import {
  fetchAllProductionCosts,
  createProductionCost,
  updateProductionCost,
  deleteProductionCost,
} from '../controllers/CostController.js';

const productionCostRouter = express.Router();

// Fetch all production costs
productionCostRouter.get('/', fetchAllProductionCosts);

// Add a new production cost
productionCostRouter.post('/', createProductionCost);

// Update an existing production cost by ID
productionCostRouter.put('/:id', updateProductionCost);

// Delete a production cost by ID
productionCostRouter.delete('/:id', deleteProductionCost);

export default productionCostRouter;
