const express = require ('express');
const router = express.Router();

const farmerController = require('../../services/farmService/farmerServices');

/** 
 * ++++++++ Farmer CRUD Controllers ++++++++++++++++++++++
*/
router.post('/addfarmer', farmerController.createFarmer);
router.get('/getfarmers', farmerController.getAllFarmers);
router.post('/creategroup', farmerController.createGroup);
router.get('/farmer', farmerController.getFarmer);
router.post('/buy', farmerController.createOrder);


//+++++++++++++++++++++ KPI's Controls ++++++++++++++++++
router.get('/landtotal', farmerController.totalLandSize);
router.get('/totalFarmers', farmerController.totalFarmers);

module.exports = router;