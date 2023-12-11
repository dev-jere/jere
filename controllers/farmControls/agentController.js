const express = require ('express');
const router = express.Router();

const Agent = require('../../services/farmService/agentService');

router.post('/confirmCash', Agent.agentConfirmCashPayment);
router.post('/addagent', Agent.createAgent);
router.get('/orderstatus', Agent.checkOrder);
router.post('/activity', Agent.activities);
router.get('/activity', Agent.get_farmers_activities)


module.exports = router;