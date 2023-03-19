const express = require ('express');
const router = express.Router();

const Agent = require('../services/agentService');

router.post('/confirmCash', Agent.agentConfirmCashPayment);


module.exports = router;