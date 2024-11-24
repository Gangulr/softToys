import mongoose from 'mongoose';
import Salary from '../models/SalaryDetailsModel.js'; // Ensure the correct path

// Create a new salary record
export const createSalary = async (req, res) => {
  const { employeeId, employeeName, email, baseSalary, allowances, otHours, department } = req.body;

  // Validate required fields
  if (!employeeId || !employeeName || !email || !baseSalary || !allowances || !otHours || !department) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check for duplicate salary records (e.g., by employeeId)
    const existingSalary = await Salary.findOne({ employeeId });
    if (existingSalary) {
      return res.status(400).json({ message: 'Salary record for this employee already exists' });
    }

    const newSalary = new Salary({
      employeeId,
      employeeName,
      email,
      baseSalary,
      allowances,
      otHours,
      department
    });

    const savedSalary = await newSalary.save();
    res.status(201).json(savedSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all salary records
export const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single salary record by ID
export const getSalaryById = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid salary record ID' });
    }

    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found' });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a salary record by ID
export const updateSalary = async (req, res) => {
  const { employeeId, employeeName, email, baseSalary, allowances, otHours, department } = req.body;

  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid salary record ID' });
    }

    // Create an object to hold only the fields that are being updated
    const updateFields = {};
    if (employeeId) updateFields.employeeId = employeeId;
    if (employeeName) updateFields.employeeName = employeeName;
    if (email) updateFields.email = email;
    if (baseSalary) updateFields.baseSalary = baseSalary;
    if (allowances) updateFields.allowances = allowances;
    if (otHours) updateFields.otHours = otHours;
    if (department) updateFields.department = department;

    // Update the salary record
    const updatedSalary = await Salary.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },  // Only update the fields passed in the body
      { new: true, runValidators: true }
    );

    if (!updatedSalary) {
      return res.status(404).json({ message: 'Salary record not found' });
    }

    res.status(200).json(updatedSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a salary record by ID
export const deleteSalary = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid salary record ID' });
    }

    const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
    if (!deletedSalary) {
      return res.status(404).json({ message: 'Salary record not found' });
    }

    res.status(200).json({ message: 'Salary record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

