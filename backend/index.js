import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';



import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import OrderRoute from './routes/OrderRoute.js';
import ResourceRoute from './routes/ResourceRoute.js';
import productionCostRoute from './routes/productionCostRoute.js';
import salarycalculatorrouter from './routes/salarycalculatorrouter.js';
import billOrderRouter from './routes/billOrderRouter.js';
import AuthRoutes from './routes/AuthRoutes.js';
import RawMaterial from './routes/RawMaterialRoute.js';
import FinishingGoodsRoute from './routes/FinishingGoodsRoute.js';
import RawMaterialRequest from './routes/RawMaterialRequestRoute.js';
import MonthlyEvalution from './routes/MonthlyEvalutionRoute.js';
import ProductionRequest from './routes/ProductionRequestRoute.js';
import LeaveReqRoutes from './routes/LeaveReqRoutes.js';  
import AddEmployeeRoutes from './routes/AddEmployeeRoutes.js'; 
import Financetable from './routes/FinancetableRouter.js';
import SalaryDetailsRoutes from './routes/SalaryDetailsRoutes.js';
import AttendenceRoutes from './routes/AttendenceRoutes.js';
import route from './routes/ReportRoute.js';
import SupplierRoutes from './routes/supplierRoutes.js'; // Adjust the path if necessary
import OrderRoutes from './routes/orderRoutes.js';
import DashboardRoutes from './routes/dashboard.js';
import ShopRoute from './routes/shopRoutes.js';
import PromotionRoute from './routes/promotionRoutes.js';
import ProductRouteDinu from './routes/productRoutesdinu.js';
import CartRoute from './routes/cartRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/order", OrderRoute);
app.use("/api/resource", ResourceRoute);
app.use("/api/productionCost", productionCostRoute);
app.use('/api/salarycalculates', salarycalculatorrouter);
app.use('/api/billorder', billOrderRouter);
app.use('/api/auth', AuthRoutes);
app.use("/api/rawMaterial", RawMaterial);
app.use('/api/finishingGoods', FinishingGoodsRoute);
app.use('/api/rawMaterialRequest', RawMaterialRequest);
app.use('/api/monthlyEvaluation', MonthlyEvalution);
app.use('/api/productionRequest', ProductionRequest);
app.use("/api/Leave", LeaveReqRoutes);  
app.use("/api/employee", AddEmployeeRoutes);
app.use("/api/finance-manager", Financetable);
app.use("/api/salary", SalaryDetailsRoutes);
app.use('/api/attendence', AttendenceRoutes);
app.use("/api/Report", route);
app.use("/api/DashBoardRoute", route);
app.use("/api", SupplierRoutes);
app.use("/api", OrderRoutes);
app.use("/api", DashboardRoutes);
app.use("/api/shop", ShopRoute);
app.use("/api/promo", PromotionRoute);
app.use("/api/product", ProductRouteDinu);
app.use("/api/cart", CartRoute);


const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname, '/uploads/products')));

app.listen(port, () => console.log(`Server running on port: ${port}`));
