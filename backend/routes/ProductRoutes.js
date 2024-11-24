import express from 'express';
import { addProduction, fetchAllProductions, updateProduction, deleteProduction, fetchProductionById } from '../controllers/ProductController.js';

const ProductionRoute = express.Router();

ProductionRoute.get("/", fetchAllProductions);
ProductionRoute.post("/", express.json(), addProduction);
ProductionRoute.get("/:productionId", fetchProductionById);
ProductionRoute.put("/:productionId", express.json(), updateProduction);
ProductionRoute.delete("/:productionId", deleteProduction);

export default ProductionRoute;