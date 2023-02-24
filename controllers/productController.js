const express = require ('express');
const router = express.Router();

const productController = require('../services/productService');



router.post('/addproduct', productController.createProduct);
router.post('/getproduct', productController.getProduct);
router.get('/getall', productController.getAllProducts);


module.exports = router;