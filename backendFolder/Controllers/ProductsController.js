const Products = require('../Models/ProductsModal')

// Add Products
module.exports.AddProducts = async (req, res, next) => {
  try {
    console.log('Add Products')
    const { productName, productQuantity,productPrice, productManufacturer, productDescription , userId } = req.body;
    const product = await Products.create({ productName, productQuantity,productPrice, productManufacturer, productDescription ,userId });
    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to add product' });
  }
};

// Fetch Products
// module.exports.FetchProducts = async (req, res) => {
//   const userID  = req.params.id;
//     try {
//       console.log('req.user.id ', userID)
//         const users = await Products.find({userID});
//         res.status(200).json(users);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
//   };
// Fetch Products
module.exports.FetchProducts = async (req, res) => {
  const userId = req.params.userId;
  try {
    console.log('req.params.userId', userId);
    const products = await Products.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Delete Products
module.exports.DeleteProducts = async (req, res) => {
    try {
      const id = req.params.id; // Retrieve the id parameter from the URL
      console.log('delete Controller', id);
      const result = await Products.deleteOne({ _id: id }); // Delete the product with the given id
      res.status(200).json({ message: `Product has been deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //Edit Products
module.exports.EditProducts = async (req, res) => {
    try {
        const id = req.params.id; 
        const update = req.body; 
        console.log('Edit Controller', id, update);
        const result = await Products.updateOne({ _id: id }, update);
        res.status(200).json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
  };
  
  