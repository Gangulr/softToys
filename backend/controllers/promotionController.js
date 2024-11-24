// promotionController.js

import PromotionModel from '../models/PromotionModel.js'; // Ensure the path is correct
import { v4 as uuidv4 } from 'uuid'; // If you want to use UUIDs for promotions

// Get all promotions
export const getAllPromotions = async (_req, res) => {
    try {
        const promotions = await PromotionModel.find(); // Fetch all promotions from the database
        res.status(200).json(promotions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to retrieve promotions", error: error.message });
    }
};

// Create a new promotion
export const createPromotion = async (req, res) => {
    try {
        const { name, description, discount, startDate, endDate } = req.body; // Extracting fields from request body

        // Validation checks
        if (!name) return res.status(400).json({ error: "Promotion name is required" });
        if (discount === undefined || discount === null) return res.status(400).json({ error: "Discount is required" });
        if (!startDate) return res.status(400).json({ error: "Start date is required" });
        if (!endDate) return res.status(400).json({ error: "End date is required" });

        // Creating a new promotion instance
        const promotion = new PromotionModel({
            _id: uuidv4(), // Assign a UUID
            name,
            description,
            discount,
            startDate,
            endDate
        });

        // Saving the promotion to the database
        const savedPromotion = await promotion.save();
        res.status(201).json({ msg: "Promotion created successfully", savedPromotion });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Failed to create promotion", error: error.message });
    }
};

// Update a promotion
export const updatePromotion = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const { name, description, discount, startDate, endDate } = req.body; // Extracting fields from request body

        // Updating the promotion in the database
        const updatedPromotion = await PromotionModel.findByIdAndUpdate(id, {
            name,
            description,
            discount,
            startDate,
            endDate
        }, { new: true, runValidators: true });

        if (!updatedPromotion) {
            return res.status(404).json({ error: "Promotion not found" });
        }

        res.json({ msg: "Promotion updated successfully", updatedPromotion });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Failed to update promotion", error: error.message });
    }
};

// Delete a promotion
export const deletePromotion = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const deletedPromotion = await PromotionModel.findByIdAndDelete(id); // Delete the promotion from the database

        if (!deletedPromotion) {
            return res.status(404).json({ error: "Promotion not found" });
        }

        res.json({ msg: "Promotion deleted successfully", deletedPromotion });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Failed to delete promotion", error: error.message });
    }
};
