const express = require ('express');
const router = express.Router();

const farmerController = require('../services/farmerServices');

router.post('/register', farmerController.createFarmer);
router.get('/getfarmer', farmerController.getFarmers);

module.exports = router;