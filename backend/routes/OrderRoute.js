// routes/OrderRoute.js
import express from 'express';
import { addOrder,fetchAllOrders } from '../controllers/OrderController.js';

const OrderRoute = express.Router();

OrderRoute.get("/",fetchAllOrders);
OrderRoute.post("/", express.json(),addOrder);

export default OrderRoute;
