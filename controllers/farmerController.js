const express = require ('express');
const router = express.Router();

const farmerController = require('../services/farmerServices');
const ussdMenu = require('../services/ussdMenu');


router.post('/register', farmerController.createFarmer);
router.post('/getfarmer', farmerController.getFarmer);



module.exports = router;