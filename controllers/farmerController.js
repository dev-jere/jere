const express = require ('express');
const router = express.Router();

const farmerController = require('../services/farmerServices');

router.post('/register', farmerController.createFarmer);
router.get('/getfarmer', farmerController.getFarmers);
router.post('/buy', farmerController.createOrder);

module.exports = router;