import express from 'express';
import EmployeeController from '../controllers/addEmployeeController.js';

const EmployeeRoutes = express.Router();

// Route to create a new employee
EmployeeRoutes.post("/", express.json(), EmployeeController.createEmployee);

// Route to get all employees
EmployeeRoutes.get("/", EmployeeController.getAllEmployees);

// Route to get an employee by ID
EmployeeRoutes.get("/:id", EmployeeController.getEmployeeById);

// Route to update an employee by ID
EmployeeRoutes.put("/:id", express.json(), EmployeeController.updateEmployee);

// Route to delete an employee by ID
EmployeeRoutes.delete("/:id", EmployeeController.deleteEmployee);

export default EmployeeRoutes;
