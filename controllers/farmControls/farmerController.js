const express = require ('express');
const router = express.Router();

const farmerController = require('../../services/farmService/farmerServices');

router.post('/register', farmerController.createFarmer);
router.get('/getfarmers', farmerController.getFarmers);
router.get('/farmer', farmerController.Farmer);
router.post('/buy', farmerController.createOrder);
router.get('/landtotal', farmerController.totalLandSize);
router.get('/totalFarmers', farmerController.totalFarmers);

module.exports = router;