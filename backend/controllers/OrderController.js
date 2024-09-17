


import OrderModel from "../models/OrderModel.js";


//fetch all orders 

export const fetchAllOrders = async (req, res) => {
    try {
        const { status } = req.query; // Example: filter by status if passed as a query parameter
        const orders = status ? await OrderModel.find({ status }) : await OrderModel.find();
        res.json(orders);
    } catch (error) {
        res.status(400).json({ msg: "No order record found", error });
    }

};




// Add a new order
export const addOrder = async (req, res) => {
    try {
        // Extract fields from the request body
        const { shopName, orderDate, status, orderItems } = req.body;

        // Validate the required fields
        if (!shopName) return res.status(400).json({ error: "Shop name is required" });
        if (!orderDate) return res.status(400).json({ error: "Order date is required" });
        if (!status) return res.status(400).json({ error: "Status is required" });
        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ error: "At least one order item is required" });
        }

        // Create a new Order document
        const order = new OrderModel({ shopName, orderDate, status, orderItems });

        // Save the order record to the database
        await order.save();

        // Respond with success message
        res.status(201).json({ msg: "Order added successfully", order });
    } catch (error) {
        // Log the error and respond with a failure message
        console.error(error);
        res.status(400).json({ msg: "Failed to add order", error });
    }
};
