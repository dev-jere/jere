const express = require ('express');
const router = express.Router();

const farmerController = require('../../services/farmService/farmerServices');

router.post('/addfarmer', farmerController.createFarmer);
router.get('/getfarmers', farmerController.getAllFarmers);
router.post('/creategroup', farmerController.createGroup);
router.get('/farmer', farmerController.getFarmer);
router.post('/buy', farmerController.createOrder);
router.get('/landtotal', farmerController.totalLandSize);
router.get('/totalFarmers', farmerController.totalFarmers);

module.exports = router;