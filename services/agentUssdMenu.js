/**
 * This is the agent/retailer service
 */
const Farmer = require('../models/farmerModel'); //Farmer model
const Order = require('../models/transaction');
const Agent = require('../models/agentModel');


//Agent Initial onboarding logic
exports.createAgent = [ async (req, res) => {
    const {first_name, last_name, phone, state, lga, pin} = req.body
    const agent = await Agent.findOne({phone: phone});
    if (agent) {
        res.status(401).send("Agent with this phone number already exsist")
    } else {
        const newAgent = new Agent({
            first_name,
            last_name,
            phone,
            state,
            lga,
            pin,
        })
        await newAgent.save()
        res.status(201).send("Agent added successfully");
    }
}]
// Transaction confirmation for cash order completion logic
exports.agentConfirmCashPayment = [ async (req, res) => {
    const { id, status} = req.body;
    const response = await Order.updateOne({transactionId: id}, {$set:{paymentStatus: status}})
    console.log(response);
    if(response) {
        res.status(200).json("Transaction Complete");

    } else {
        res.status(501).send("failed");
    }
}]