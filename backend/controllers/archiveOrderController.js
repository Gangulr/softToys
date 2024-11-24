const Order = require('../models/OrderModel'); // Import the Order model
const ArchivedOrder = require('../models/ArchieveOrderModel'); // Import the ArchivedOrder model

// Archive order controller function
const archiveOrder = async (req, res) => {
  const { _id, shopName, orderDate, status, orderItems } = req.body;

  try {
    // Step 1: Create an archived order and save it
    const archivedOrder = new ArchivedOrder({
      shopName,
      orderDate,
      status,
      orderItems,
    });
    await archivedOrder.save();

    // Step 2: Delete the order from the active orders collection
    await Order.findByIdAndDelete(_id);

    res.status(200).json({ message: 'Order archived successfully' });
  } catch (error) {
    console.error('Error archiving order:', error);
    res.status(500).json({ message: 'Error archiving order' });
  }
};

// Export the controller functions
module.exports = {
  archiveOrder,
};
