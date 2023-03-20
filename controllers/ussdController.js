const express = require ('express');
const router = express.Router();

const ussdMenu = require('../services/ussdMenu');
const agentMenu = require('../services/agentMenu');


router.post('/farmer', ussdMenu.Menu);
router.post('/agent', agentMenu.Menu);

module.exports = router;