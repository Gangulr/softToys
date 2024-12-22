// Packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";
import cors from 'cors';

// utils (correct the spelling from "utiles" to "utils")
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import LeaveReqRoutes from './routes/LeaveReqRoutes.js';  // Consistent naming
import AddEmployeeRoutes from './routes/AddEmployeeRoutes.js'; 
import SalaryDetailsRoutes from './routes/SalaryDetailsRoutes.js';
import AttendenceRoutes from './routes/AttendenceRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/Leave", LeaveReqRoutes);  // Ensure route path matches case sensitivity
app.use("/api/employee", AddEmployeeRoutes)
app.use("/api/salary", SalaryDetailsRoutes);
app.use('/api/attendence', AttendenceRoutes); // Ensure the path matches
app.use('api/dashboard', dashboardRoutes);




const __dirname = path.resolve();
app.use('/uploads/products', express.static(path.join(__dirname, '/uploads/products')));

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
