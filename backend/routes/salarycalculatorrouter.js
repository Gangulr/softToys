import express from 'express';
import { 
  createEmployeeSalary, 
  getEmployeeSalaries, 
  getEmployeeSalaryById, 
  updateEmployeeSalary, 
  deleteEmployeeSalary 
} from '../controllers/salarycalculatecontroller.js';

const router = express.Router();

// Define your routes
router.post('/', express.json(), createEmployeeSalary);  // Create a new employee salary record
router.get('/', getEmployeeSalaries);                    // Get all employee salary records
router.get('/:id', getEmployeeSalaryById);               // Get a single employee salary record by ID
router.put('/:id', updateEmployeeSalary);                // Update an employee salary record by ID
router.delete('/:id', deleteEmployeeSalary);             // Delete an employee salary record by ID

export default router;
