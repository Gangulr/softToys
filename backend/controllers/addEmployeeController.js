import Employee from '../models/AddEmployeeModel.js'; 
import mongoose from 'mongoose';

class EmployeeController {
  // Create a new employee
  static async createEmployee(req, res) {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all employees
  static async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get an employee by ID
  static async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update an employee by ID
  static async updateEmployee(req, res) {
    const { firstName, lastName, email, nic, employeeId, department, employeeType, designation, baseSalary, dateOfBirth, joiningDate } = req.body;
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid employee ID format.' });
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          nic,
          employeeId,
          department,
          employeeType,
          designation,
          baseSalary: parseFloat(baseSalary),
          dateOfBirth,
          joiningDate,
        },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update employee.' });
    }
  }

  // Delete an employee by ID
  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid employee ID format.' });
      }

      const employee = await Employee.findByIdAndDelete(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      res.status(204).send(); // No content on successful delete
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete employee.' });
    }
  }
}

export default EmployeeController;
