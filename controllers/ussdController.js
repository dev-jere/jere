const express = require ('express');
const router = express.Router();


const ussdMenu = require('../ussdfront/index');
const ussdMenu = require('../services/ussdMenu');


router.post('/menu', ussdMenu.Menu);




module.exports = router;