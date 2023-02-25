const express = require ('express');
const router = express.Router();

const menu = require('../ussdfront/index');




const ussdMenu = require('../services/ussdMenu');


router.post('/menu', ussdMenu.Menu);
router.post('/ussd', (req, res) => {
    menu(req).run(req.body, ussdResult => {
        res.send(ussdResult);
    })
})




module.exports = router;