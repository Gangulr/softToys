import EmployeeSalary from '../models/salarycalculateModel.js';

// Create a new employee salary record
export const createEmployeeSalary = async (req, res) => {
  try {
    const newEmployeeSalary = new EmployeeSalary(req.body);
    const savedEmployeeSalary = await newEmployeeSalary.save();
    res.status(201).json(savedEmployeeSalary);
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee salary record', error: error.message });
  }
};

// Get all employee salary records
export const getEmployeeSalaries = async (req, res) => {
  try {
    const employeeSalaries = await EmployeeSalary.find();
    res.status(200).json(employeeSalaries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee salary records', error: error.message });
  }
};

// Get a single employee salary record by ID
export const getEmployeeSalaryById = async (req, res) => {
  try {
    const employeeSalary = await EmployeeSalary.findById(req.params.id);
    if (!employeeSalary) return res.status(404).json({ message: 'Employee salary record not found' });
    res.status(200).json(employeeSalary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee salary record', error: error.message });
  }
};

// Update an employee salary record by ID
export const updateEmployeeSalary = async (req, res) => {
  try {
    const updatedEmployeeSalary = await EmployeeSalary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployeeSalary) return res.status(404).json({ message: 'Employee salary record not found' });
    res.status(200).json(updatedEmployeeSalary);
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee salary record', error: error.message });
  }
};

// Delete an employee salary record by ID
export const deleteEmployeeSalary = async (req, res) => {
  try {
    const deletedEmployeeSalary = await EmployeeSalary.findByIdAndDelete(req.params.id);
    if (!deletedEmployeeSalary) return res.status(404).json({ message: 'Employee salary record not found' });
    res.status(200).json({ message: 'Employee salary record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee salary record', error: error.message });
  }
};
