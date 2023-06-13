const express = require ('express');
const router = express.Router();

const transaction = require ('../services/Transactions');

router.get('/monthly', transaction.monthlyTranactions);

module.exports = router;