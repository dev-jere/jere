const express = require ('express');
const router = express.Router();

const farmerController = require('../services/farmerServices');
const ussdMenu = require('../services/ussdMenu');


router.post('/menu', ussdMenu.Menu);




module.exports = router;