const express = require ('express');
const router = express.Router();

const productController = require('../../services/transactionService/productService');

router.post('/addproduct', productController.createProduct);
router.get('/getproduct', productController.getProduct);
router.get('/getall', productController.getAllProducts);

module.exports = router;