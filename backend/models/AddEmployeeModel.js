import mongoose from 'mongoose';

// Create a schema for Employee
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[a-zA-Z\s]+$/.test(v),
      message: 'First name can only contain letters and spaces.',
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[a-zA-Z\s]+$/.test(v),
      message: 'Last name can only contain letters and spaces.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v),
      message: 'Please enter a valid email address.',
    },
  },
  nic: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const isValidLength = v.length === 12 || (v.length === 10 && /^[0-9]{9}[Vv]$/.test(v));
        return isValidLength;
      },
      message: 'NIC must be 12 digits or 9 digits followed by V/v.',
    },
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[0-9]{1,5}$/.test(v),
      message: 'Employee ID must be numeric and up to 5 digits.',
    },
  },
  department: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    enum: ['Permanent', 'Contract'],
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
    min: [0, 'Base salary must be a positive number.'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        // Ensure joining date is after date of birth
        return v > this.dateOfBirth;
      },
      message: 'Joining date must be after the date of birth.',
    },
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
