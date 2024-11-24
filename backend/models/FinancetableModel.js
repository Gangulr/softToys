import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now, // Default to current date
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['income', 'expenses', 'assets', 'liabilities'], // Restrict to these values
  },
  description: {
    type: String,
    required: true,
    trim: true, // Trims whitespace from the description
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number'], // Amount must be positive
  },
});

// Create and export the Transaction model
const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
