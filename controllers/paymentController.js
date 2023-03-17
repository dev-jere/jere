const express = require ('express');
const router = express.Router();

//const wallet = require('../services/wallet');
const paystack = require('../services/paymentService');

//router.get("/response", wallet.payment);
//router.post("/flw-ussd", wallet.flwHook);
//router.post("/ussdpay", wallet.payWithUssd);
//router.post("/bankpay", wallet.bankPayment);
//router.post("/paystack", paystack.paystackBank);
router.get('/transactions', paystack.transactions);
router.get('/transaction', paystack.transaction);
router.get('/total', paystack.Total);
module.exports = router;