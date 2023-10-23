const express = require ('express');
const router = express.Router();

const ussdMenu = require('../services/ussdServices/ussdMenu');
const agentMenu = require('../services/ussdServices/agentMenu');


router.post('/farmer', ussdMenu.Menu);
router.post('/agent', agentMenu.Menu);

module.exports = router;