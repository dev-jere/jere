const express = require ('express');
const router = express.Router();

const farmerController = require('../services/farmerServices');

router.post('/register', farmerController.createFarmer);
router.get('/getfarmers', farmerController.getFarmers);
router.get('/farmer', farmerController.Farmer);
router.post('/buy', farmerController.createOrder);

module.exports = router;