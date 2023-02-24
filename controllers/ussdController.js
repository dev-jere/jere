const express = require ('express');
const router = express.Router();


const ussdMenu = require('../ussdfront/index');


router.post('/menu', ussdMenu.Menu);




module.exports = router;