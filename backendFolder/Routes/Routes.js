const { register, login } = require("../controllers/authControllers");
 const { checkUser } = require("../Middlewares/AthMiddlewares");
const {AddProducts, FetchProducts, DeleteProducts, EditProducts} = require('../Controllers/ProductsController');
const { AddStores, FetchStores, DeleteStores, EditStores } = require("../Controllers/StoresController");
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

module.exports = router;