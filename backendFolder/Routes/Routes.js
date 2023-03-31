const { register, login } = require("../controllers/authControllers");
 const { checkUser } = require("../Middlewares/AthMiddlewares");
const {AddProducts, FetchProducts, DeleteProducts, EditProducts} = require('../Controllers/ProductsController')
const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post('/addProducts' , AddProducts )
router.get('/fetchProducts' , FetchProducts )
router.delete('/deleteProduct/:id' , DeleteProducts )
router.put('/editProduct/:id' , EditProducts )

module.exports = router;