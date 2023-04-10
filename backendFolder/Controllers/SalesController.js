const SalesItem = require('../Models/SalesModal')

// Add Products
module.exports.AddSales = async (req, res, next) => {
  try {
    
    const {salesProductsId ,salesStoreId , salesQuantity ,salesPrice , salesDate  ,userId  } = req.body;
    const sales = await SalesItem.create({salesProductsId ,salesStoreId , salesQuantity ,salesPrice , salesDate  ,userId  });
    // console.log('add salw',sales)
    res.status(201).json({ success: true, message: 'Sales Item added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to add Sales Item' });
  }
};

// Fetch Purchase Item
module.exports.FetchSales = async (req, res) => {
  const userId = req.params.userId;
  try {
    const sales = await SalesItem.find({ userId });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Delete Products
module.exports.DeleteSales = async (req, res) => {
    try {
        // console.log('del')
      const id = req.params.id; // Retrieve the id parameter from the URL
      const result = await SalesItem.deleteOne({ _id: id }); // Delete the product with the given id
      res.status(200).json({ message: `Sale Item has been deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //Edit Products
module.exports.EditSales = async (req, res) => {
    try {
        const id = req.params.id; 
        const update = req.body; 
        const result = await SalesItem.updateOne({ _id: id }, update);
        res.status(200).json({ success: true, message: 'Sale Item updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to Edit Sale Item' });
    }
  };
  
  