import CartModel from '../models/cartModel.js';

// Get all cart items
export const getCart = async (_req, res) => {
  try {
    const carts = await CartModel.find();
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Failed to retrieve carts", error: error.message });
  }
};

// Add new cart
export const createCart = async (_req, res) => {
  try {
    const { products, shopName, shopAddress, total, discount } = _req.body;

    // Validation checks
    if (!products || !shopName || !shopAddress || total === undefined) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newCart = new CartModel({
      products,
      shopName,
      shopAddress,
      total,
      discount,
    });

    await newCart.save();
    res.status(201).json({ msg: "Cart created successfully", newCart });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Failed to create cart", error: error.message });
  }
};

// Update cart by ID
export const updateCart = async (_req, res) => {
  try {
    const { id } = _req.params;

    const updatedCart = await CartModel.findByIdAndUpdate(
      id,
      _req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ msg: "Cart updated successfully", updatedCart });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Failed to update cart", error: error.message });
  }
};

// Delete cart by ID
export const deleteCart = async (_req, res) => {
  try {
    const { id } = _req.params;
    const deletedCart = await CartModel.findByIdAndDelete(id);

    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ msg: "Cart deleted successfully", deletedCart });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Failed to delete cart", error: error.message });
  }
};
