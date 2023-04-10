const PurchaseItem = require('../Models/PurchaseModals')

// Add Products
module.exports.AddPurchaseItem = async (req, res, next) => {
  try {
    const { purchaseProductsId, purchaseQuantity,purchasePrice, purchaseDate, userId } = req.body;
    const purchase = await PurchaseItem.create({ purchaseProductsId, purchaseQuantity,purchasePrice, purchaseDate, userId  });
    res.status(201).json({ success: true, message: 'Purchase Item added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to add Purchase Item added' });
  }
};

// Fetch Purchase Item
module.exports.FetchPurchaseItem = async (req, res) => {
  const userId = req.params.userId;
  try {
    const purchase = await PurchaseItem.find({ userId });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Delete Products
module.exports.DeletePurchaseItem = async (req, res) => {
    try {
        // console.log('del')
      const id = req.params.id; // Retrieve the id parameter from the URL
      const result = await PurchaseItem.deleteOne({ _id: id }); // Delete the product with the given id
      res.status(200).json({ message: `Purchase Item has been deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //Edit Products
module.exports.EditPurchaseItem = async (req, res) => {
    try {
        const id = req.params.id; 
        const update = req.body; 
        const result = await PurchaseItem.updateOne({ _id: id }, update);
        res.status(200).json({ success: true, message: 'Purchase Item updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add Purchase Item' });
    }
  };
  
  