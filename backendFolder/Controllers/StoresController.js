const Store = require('../Models/StoreModal')

// Add Products
module.exports.AddStores = async (req, res, next) => {
  try {
    console.log('Add Stores')
    const { storeName,storeLocation , userId} = req.body;
    const store = await Store.create({ storeName,storeLocation , userId});
    res.status(201).json({ success: true, message: 'Store added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to add Store' });
  }
};

// Fetch Products
module.exports.FetchStores = async (req, res) => {
  const userId = req.params.userId;
    try {
        const store = await Store.find({ userId });
        console.log('Fetch Controller', store);
        res.status(200).json(store);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };

//Delete Products
module.exports.DeleteStores = async (req, res) => {
    try {
      const id = req.params.id; // Retrieve the id parameter from the URL
      console.log('delete Controller', id);
      const result = await Store.deleteOne({ _id: id }); // Delete the product with the given id
      res.status(200).json({ message: `Store has been deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //Edit Products
module.exports.EditStores = async (req, res) => {
    try {
        const id = req.params.id; 
        const update = req.body; 
        const result = await Store.updateOne({ _id: id }, update);
        res.status(200).json({ success: true, message: 'Store updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add store' });
    }
  };
  
  