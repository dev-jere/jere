const express = require ('express');
const router = express.Router();

const farmerController = require('../services/farmerServices');



router.post('/register', farmerController.createFarmer);
router.post('/getfarmer', farmerController.getFarmer);



module.exports = router;