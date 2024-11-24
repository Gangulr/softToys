import express from "express";


import {getCompletedDeliveriesCount} from "../controler/dashboardController.js";
import { getDeliveryReports } from '../controllers/reportController.js';

const router = express.Router();
//route direction
router.get("/completed-deliveries-count", getCompletedDeliveriesCount)
// Route to get all delivery reports for charts
router.get('/reports', getDeliveryReports);

export default router