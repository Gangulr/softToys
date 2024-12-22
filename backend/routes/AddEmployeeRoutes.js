import express from 'express';
import EmployeeController from '../controllers/addEmployeeController.js';

const EmployeeRoutes = express.Router();

// Middleware to parse JSON body
EmployeeRoutes.use(express.json());

// Route to create a new employee
EmployeeRoutes.post("/", EmployeeController.createEmployee);

// Route to get all employees
EmployeeRoutes.get("/", EmployeeController.getAllEmployees);

// Route to get an employee by ID
EmployeeRoutes.get("/:id", EmployeeController.getEmployeeById);

// Route to update an employee by ID
EmployeeRoutes.put("/:id", EmployeeController.updateEmployee);

// Route to delete an employee by ID
EmployeeRoutes.delete("/:id", EmployeeController.deleteEmployee);

// Route to get employee count (added for your HR dashboard)
EmployeeRoutes.get("/count", async (req, res) => {
    try {
        const count = await EmployeeController.getEmployeeCount(); // Make sure this function is implemented in your controller
        res.json({ count });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        res.status(500).json({ message: 'Failed to fetch employee count' });
    }
});

export default EmployeeRoutes;
