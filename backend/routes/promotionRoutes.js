// promotionRoutes.js

import express from 'express';
import {
    getAllPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
} from '../controllers/promotionController.js';

const PromotionRoute = express.Router();

// Fetch all promotions
PromotionRoute.get("/", getAllPromotions);

// Add a new promotion
PromotionRoute.post("/", express.json(), createPromotion);

// Update a promotion
PromotionRoute.put("/:id", express.json(), updatePromotion);

// Delete a promotion
PromotionRoute.delete("/:id", deletePromotion);

export default PromotionRoute;
