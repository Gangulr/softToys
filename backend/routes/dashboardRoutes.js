import express from 'express';
import { getDashboardCounts } from '../controllers/dashboardController.js';


const router = express.Router();

// Define the route for getting dashboard counts
router.get('/api/dashboard/counts', getDashboardCounts);

export default router;
