const SalesItem = require('../Models/SalesModal')
const Products = require('../Models/ProductsModal')

// Add Products
module.exports.AddSales = async (req, res, next) => {
  try {
    
    const {salesProductsId ,salesStoreId , salesQuantity ,salesPrice , salesDate  ,userId  } = req.body;
    const sales = await SalesItem.create({salesProductsId ,salesStoreId , salesQuantity ,salesPrice , salesDate  ,userId  });
    // console.log('add salw',sales)

     //Decrease stock 
     const product = await Products.findById(salesProductsId);
    //  console.log(purchase.purchaseQuantity);
    //  console.log(product.productQuantity);
     const updatedQuantity = product.productQuantity - sales.salesQuantity;
     await Products.findByIdAndUpdate(salesProductsId, { productQuantity: updatedQuantity });
 

    res.status(201).json({ success: true, message: 'Sales Item added successfully' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json({ success: false, message: 'The product already exists In Sales List.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add product' });
    }
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
      const q = req.params;
      console.log(q)
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
  
  