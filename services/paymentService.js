//const https = require('https');
const axios = require("axios")
const { v4: uuidv4 } = require('uuid');
//Paystack Integration

exports.paystackBank = [ async(req, res) => {
    try {        
        const url = `https://api.paystack.co/transaction/initialize`
        
        const response = await axios({
            url,
            data: {
                email: req.body.email,
                amount: req.body.amount,
                reference: uuidv4()
            },
            method: "post",
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                Authorization: `${process.env.SECRET_KEY}`
            }
        })
        res.status(200).json(response.data);
        console.log(response.data);

    } catch (err) {
        console.log(err);
    }
}]

const verify = async (reference) => {
    try {
        const url = `https://api.paystack.co/transaction/verify/${reference}`
        const response = await axios({
            url,
            reference,
            method: "get",
            Authorization: process.env.SECRET_KEY
        })

        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

