import express from 'express';
import * as finishingGoodsController from '../controllers/FinishingGoodsController.js';

const router = express.Router();

// Define routes
router.get('/',finishingGoodsController.getProducts);
router.get('/:id', finishingGoodsController.getProductById);
router.post('/', finishingGoodsController.createProduct);
router.put('/:id', finishingGoodsController.updateProduct);
router.delete('/:id', finishingGoodsController.deleteProduct);

export default router;
