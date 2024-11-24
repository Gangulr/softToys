import mongoose from 'mongoose';

// Define the schema for employee salary calculation
const EmployeeSalarySchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v) => /^[A-Za-z\s]*$/.test(v), // Allow only letters and spaces
      message: (props) => `${props.value} is not a valid employee name!`,
    },
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^\d{5}$/.test(v), // Must be exactly 5 digits
      message: (props) => `${props.value} is not a valid employee ID! It must be exactly 5 digits.`,
    },
  },
  nic: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(?:\d{12}|\d{9}[Vv])$/.test(v), // Allow 12 digits or 9 digits followed by 'V' or 'v'
      message: (props) => `${props.value} is not a valid NIC!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\S+@\S+\.\S+$/.test(v), // Email validation
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  department: {
    type: String,
    required: true,
    enum: [
      "Production Department",
      "Supply Chain and Procurement Department",
      "Sales and Marketing Department",
      "Order Management Department",
      "Human Resources Department",
      "Finance Department",
      "Logistics and Warehouse Department",
    ],
  },
  designation: {
    type: String,
    required: true,
  },
  employeeRole: {
    type: String,
    required: true,
    enum: ["Permanent", "Contract"],
  },
  payrollMonth: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{4}-\d{2}$/.test(v), // Format: YYYY-MM
      message: (props) => `${props.value} is not a valid payroll month! It must be in YYYY-MM format.`,
    },
  },
  basicSalary: {
    type: Number,
    required: true,
    min: 0,
  },
  actualHours: {
    type: Number,
    required: true,
    min: 0,
  },
  overtimeHours: {
    type: Number,
    default: 0,
    min: 0,
  },
  unpaidLeaveDays: {
    type: Number,
    default: 0,
    min: 0,
  },
  noPayLeaveDeduction: {
    type: Number,
    default: 0,
    min: 0,
  },
  allowances: {
    type: Number,
    default: 0,
    min: 0,
  },
  bonuses: {
    type: Number,
    default: 0,
    min: 0,
  },
  medicalInsurance: {
    type: Number,
    default: 0,
    min: 0,
  },
  epfEmployee: {
    type: Number,
    default: 0,
    min: 0,
  },
  etfEmployer: {
    type: Number,
    default: 0,
    min: 0,
  },
  overtimeAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  grossSalary: {
    type: Number,
    required: true,
    min: 0,
  },
  netSalary: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create and export the model
const EmployeeSalary = mongoose.model('EmployeeSalary', EmployeeSalarySchema);
export default EmployeeSalary;
