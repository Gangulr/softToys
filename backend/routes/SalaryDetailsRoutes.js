import express from 'express';
import {
    createSalary,
    getSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary
} from '../controllers/SalaryDetailsController.js';  // Ensure the correct path

const SalaryRoutes = express.Router();

// Route to create a new salary record
SalaryRoutes.post("/", express.json(), createSalary);

// Route to get all salary records
SalaryRoutes.get("/", getSalaries);

// Route to get a salary record by ID
SalaryRoutes.get("/:id", getSalaryById);

// Route to update a salary record by ID
SalaryRoutes.put("/:id", express.json(), updateSalary);

// Route to delete a salary record by ID
SalaryRoutes.delete("/:id", deleteSalary);

export default SalaryRoutes;
