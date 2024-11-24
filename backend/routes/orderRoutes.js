import express from 'express';
import mongoose from 'mongoose';
import RequestForSupplier from '../models/RequestForSupplier.js'; // Ensure correct path

const router = express.Router();

// Create a new order
router.post('/orders', async (req, res) => {
    try {
        console.log('Received order data:', req.body);
        const { supplierName, orderDate, items } = req.body;

        if (!supplierName || !orderDate || !items) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newOrder = new RequestForSupplier({
            supplierName,
            orderDate,
            items
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error, could not create order', error });
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await RequestForSupplier.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
});

// Update an order
router.put('/orders/:id', async (req, res) => {
    try {
        const { status, isPaymentDone, paymentValue } = req.body;

        let updateData = {};

        if (status) {
            updateData.status = status;
        }

        if (isPaymentDone !== undefined) {
            updateData.isPaymentDone = isPaymentDone;
        }

        if (paymentValue !== undefined) {
            updateData.paymentValue = paymentValue;
        }

        const order = await RequestForSupplier.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
});

// Get a specific order by ID
router.get('/orders/:id', async (req, res) => {
    console.log(`Fetching order with ID: ${req.params.id}`);
    try {
        const order = await RequestForSupplier.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Error retrieving order', error });
    }
});

// Delete an order
router.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid order ID format.' });
    }

    try {
        const result = await RequestForSupplier.deleteOne({ _id: orderId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        return res.status(200).json({ message: 'Order deleted successfully.' });

    } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        return res.status(500).json({ message: 'Failed to delete order.', error: error.message });
    }
});

// Export the router
export default router;
