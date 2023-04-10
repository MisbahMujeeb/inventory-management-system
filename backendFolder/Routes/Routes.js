const { register, login } = require("../controllers/authControllers");
 const { checkUser } = require("../Middlewares/AthMiddlewares");
const {AddProducts, FetchProducts, DeleteProducts, EditProducts} = require('../Controllers/ProductsController');
const { AddStores, FetchStores, DeleteStores, EditStores } = require("../Controllers/StoresController");
const { AddPurchaseItem, FetchPurchaseItem, DeletePurchaseItem, EditPurchaseItem } = require("../Controllers/PurchaseController");
const { AddSales, FetchSales, DeleteSales, EditSales } = require("../Controllers/SalesController");
const router = require("express").Router();

//Auth Routes
router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);

//Product Routes
router.post('/addProducts' , AddProducts )
// router.get('/fetchProducts/:userId' , FetchProducts )
router.get('/fetchProducts/:userId', FetchProducts);
router.delete('/deleteProduct/:id' , DeleteProducts )
router.put('/editProduct/:id' , EditProducts )

//Stores Routes
router.post('/addStores' , AddStores )
router.get('/fetchStores/:userId', FetchStores);
router.delete('/deleteStores/:id' , DeleteStores )
router.put('/editStores/:id' , EditStores )

//Purchase
router.post('/addPurchaseItem' , AddPurchaseItem )
router.get('/fetchPurchaseItem/:userId', FetchPurchaseItem);
router.delete('/deletePurchaseItem/:id' , DeletePurchaseItem )
router.put('/editPurchaseItem/:id' , EditPurchaseItem )

//Sales
router.post('/addSales' , AddSales )
router.get('/fetchSales/:userId', FetchSales);
router.delete('/deleteSales/:id' , DeleteSales )
router.put('/editSales/:id' , EditSales )


module.exports = router;