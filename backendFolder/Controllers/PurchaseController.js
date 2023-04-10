const PurchaseItem = require('../Models/PurchaseModals')
const Products = require('../Models/ProductsModal')

// Add Products
module.exports.AddPurchaseItem = async (req, res, next) => {
  try {
    const { purchaseProductsId, purchaseQuantity,purchasePrice, purchaseDate, userId } = req.body;
    const purchase = await PurchaseItem.create({ purchaseProductsId, purchaseQuantity,purchasePrice, purchaseDate, userId  });

    //Update stock 
    const product = await Products.findById(purchaseProductsId);
    console.log(purchase.purchaseQuantity);
    console.log(product.productQuantity);
    const updatedQuantity = product.productQuantity + purchase.purchaseQuantity;
    await Products.findByIdAndUpdate(purchaseProductsId, { productQuantity: updatedQuantity });


    res.status(201).json({ success: true, message: 'Purchase Item added successfully' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json({ success: false, message: 'The product already exists in Purchase List.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to add product' });
    }
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
//Delete Products
module.exports.DeletePurchaseItem = async (req, res) => {
  try {
    const id = req.params.id;
    const purchase = await PurchaseItem.findById(id);
    const product = await Products.findById(purchase.purchaseProductsId);
    const updatedQuantity = product.productQuantity - purchase.purchaseQuantity;
    await Products.findByIdAndUpdate(purchase.purchaseProductsId, { productQuantity: updatedQuantity });
    await PurchaseItem.deleteOne({ _id: id });
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
    const purchase = await PurchaseItem.findById(id);
    const product = await Products.findById(purchase.purchaseProductsId);
    const originalQuantity = purchase.purchaseQuantity;
    const updatedQuantity = update.purchaseQuantity;
    const difference = updatedQuantity - originalQuantity;
    const newProductQuantity = product.productQuantity + difference;
    await Products.findByIdAndUpdate(purchase.purchaseProductsId, { productQuantity: newProductQuantity });
    const result = await PurchaseItem.updateOne({ _id: id }, update);
    res.status(200).json({ success: true, message: 'Purchase Item updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update Purchase Item' });
  }
}
  
  