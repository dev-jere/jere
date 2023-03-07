const express = require ('express');
const router = express.Router();

const wallet = require('../services/wallet');

router.get("/response", wallet.payment);
router.post("/flw-ussd", wallet.flwHook);
router.post("/ussdpay", wallet.payWithUssd);


module.exports = router;