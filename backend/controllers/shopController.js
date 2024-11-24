// Mock database for demonstration purposes
const shops = [];

// Create a new shop
export const createShop = (req, res) => {
  const newShop = {
    ...req.body,
    id: Date.now().toString(), // Assuming the shop ID is generated based on the current timestamp
    createdAt: new Date().toISOString(), // Add current date and time
  };
  shops.push(newShop); // Add to mock database
  res.status(201).json(newShop); // Respond with the created shop
};

// Get all shops
export const getAllShops = (req, res) => {
  res.status(200).json(shops); // Respond with the list of shops
};

// Get a specific shop by ID
export const getShopById = (req, res) => {
  const shopId = req.params.id;
  const shop = shops.find(s => s.id === shopId);
  
  if (!shop) {
    return res.status(404).json({ message: "Shop not found" });
  }
  
  res.status(200).json(shop); // Respond with the shop details
};

// Update a shop by ID
export const updateShop = (req, res) => {
  const shopId = req.params.id;
  const index = shops.findIndex(s => s.id === shopId);
  
  if (index === -1) {
    return res.status(404).json({ message: "Shop not found" });
  }
  
  const updatedShop = {
    ...shops[index],
    ...req.body,
    updatedAt: new Date().toISOString(), // Update the date of modification
  };
  
  shops[index] = updatedShop; // Save the updated shop
  res.status(200).json(updatedShop); // Respond with the updated shop
};

// Delete a shop by ID
export const deleteShop = (req, res) => {
  const shopId = req.params.id;
  const index = shops.findIndex(s => s.id === shopId);
  
  if (index === -1) {
    return res.status(404).json({ message: "Shop not found" });
  }
  
  shops.splice(index, 1); // Remove the shop from the mock database
  res.status(204).send(); // Respond with no content
};
