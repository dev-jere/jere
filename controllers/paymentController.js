const express = require ('express');
const router = express.Router();

const wallet = require('../services/wallet');

router.get("/response", wallet.payment);


module.exports = router;