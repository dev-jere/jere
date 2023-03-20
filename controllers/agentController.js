const express = require ('express');
const router = express.Router();

const Agent = require('../services/agentService');

router.post('/confirmCash', Agent.agentConfirmCashPayment);
router.post('/addagent', Agent.createAgent);
router.get('/orderstatus', Agent.checkOrder);


module.exports = router;