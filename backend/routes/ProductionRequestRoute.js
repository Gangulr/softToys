import express from 'express';
import {
  getProductionRequests,
  createProductionRequest,
  updateProductionRequest,
  deleteProductionRequest
} from '../controllers/ProductionRequestController.js'; // Use named imports

const router = express.Router();

router.get('/', getProductionRequests);
router.post('/', createProductionRequest);
router.put('/:id', updateProductionRequest);
router.delete('/:id', deleteProductionRequest);

export default router;
